import { uploadApi } from './api'
import { authorize } from './estuary'
import { hashFiles } from './hash'
import axios from 'axios'
import { create as createIpfsClient } from 'ipfs-http-client'
import last from 'it-last'

const IPFS_API_BASE =
  process.env.NEXT_PUBLIC_IPFS_UPLOAD_API || 'https://upload.ipfs.zora.co'

const defaultIpfsOptions = {
  cidVersion: 1,
} as const

const ipfs = createIpfsClient({
  url: `${IPFS_API_BASE}/api/v0`,
})

const defaultOptions = {
  onProgress: undefined,
  cache: true,
}

export type IPFSUploadResponse = {
  cid: string
  uri: string
}

type ProgressCallback = (progress: number) => void

const uploadCache = {
  prefix: 'ZORA/IPFSUploadCache',
  get(files: File[]): IPFSUploadResponse | undefined {
    const digest = hashFiles(files)
    try {
      const cid = localStorage.getItem(`${this.prefix}/${digest}`)
      console.log('ipfs-service/uploadCache', cid ? 'HIT' : 'MISS', digest, cid)
      if (cid) {
        return { cid, uri: `ipfs://${cid}` }
      }
    } catch {}
  },
  put(files: File[], cid: string) {
    const digest = hashFiles(files)
    try {
      localStorage.setItem(`${this.prefix}/${digest}`, cid)
    } catch {}
  },
}

export async function uploadFile(
  file: File,
  options?: {
    onProgress?: (progress: number) => void
    cache?: boolean
  }
): Promise<IPFSUploadResponse> {
  const { onProgress, cache } = {
    ...defaultOptions,
    ...options,
  }

  if (cache) {
    const cached = uploadCache.get([file])
    if (cached) return cached
  }

  const root = await ipfs.add(file, {
    ...defaultIpfsOptions,
    progress: (bytes: number) => {
      if (typeof onProgress === 'function') onProgress((bytes / file.size) * 100)
    },
  })

  const cid = root.cid.toString()
  const uri = `ipfs://${cid}`

  console.info('ipfs-service/upload', { cid, uri })

  uploadCache.put([file], cid)

  return {
    cid,
    uri,
  }
}

export type FileEntry =
  | File
  | {
      content: File
      path: string
    }

export async function uploadDirectory(
  fileEntries: FileEntry[],
  options?: {
    onProgress?: (progress: number) => void
    cache?: boolean
  }
): Promise<IPFSUploadResponse> {
  const entries = fileEntries.map((entry) => {
    if (entry instanceof File) {
      return {
        content: entry,
        path: entry.name,
      }
    }

    return entry
  })

  const files = entries.map((entry) => entry.content)

  const { onProgress, cache } = {
    ...defaultOptions,
    ...options,
  }

  if (cache) {
    const cached = uploadCache.get(files)
    if (cached) return cached
  }

  const totalBytes = entries.reduce((total, entry) => total + entry.content.size, 0)
  let completeBytes = 0

  const root = await last(
    ipfs.addAll(entries, {
      ...defaultIpfsOptions,
      wrapWithDirectory: true,
      progress: (bytes: number) => {
        completeBytes += bytes
        if (typeof onProgress === 'function') {
          onProgress((completeBytes / totalBytes) * 100)
        }
      },
    })
  )

  if (!root) throw new Error('Directory upload failed')

  const cid = root.cid.toString()
  const uri = `ipfs://${cid}`

  console.info('ipfs-service/uploadDirectory', { cid })

  uploadCache.put(files, cid)

  return {
    uri,
    cid,
  }
}

/*
 *
 *
 * TODO: Below to be deprecated in future
 *
 *
 */

type IpfsUploadProviderType = 'ESTUARY' | 'NFT_STORAGE'

interface IpfsUploadProvider {
  upload: (file: File, onProgress?: ProgressCallback) => Promise<string>
  name: IpfsUploadProviderType
}

const EstuaryUploadProvider: IpfsUploadProvider = {
  name: 'ESTUARY',
  async upload(file, onProgress) {
    if (!file) throw new Error('File not provided')

    if (typeof onProgress === 'function') onProgress(0)

    const { shuttle, token } = await authorize()

    if (!shuttle || !token) throw new Error('Could not get Estuary shuttle')
    const isCar = file.type === 'application/car'

    let payload
    if (isCar) {
      payload = file
    } else {
      payload = new FormData()
      payload.append('data', file)
    }

    const shuttleUrl = isCar ? `${shuttle}-car` : shuttle

    const resp = await axios.request({
      method: 'POST',
      url: shuttleUrl,
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
      onUploadProgress: (e) =>
        typeof onProgress === 'function' &&
        e.total &&
        onProgress((e.loaded / e.total) * 100),
    })

    return resp.data.cid
  },
}

const NFTStorageUploadProvider: IpfsUploadProvider = {
  name: 'NFT_STORAGE',
  async upload(file, onProgress) {
    if (typeof onProgress === 'function') onProgress(0)

    const resp = await uploadApi.post('/storage/upload', file, {
      headers: {
        'Content-type': file.type,
      },
      onUploadProgress: (e) =>
        typeof onProgress === 'function' &&
        e.total &&
        onProgress((e.loaded / e.total) * 100),
    })

    return resp.data.value?.cid
  },
}

const ipfsUploadProviders: Record<IpfsUploadProviderType, IpfsUploadProvider> = {
  ESTUARY: EstuaryUploadProvider,
  NFT_STORAGE: NFTStorageUploadProvider,
}

const ipfsUploadProviderPriority: IpfsUploadProvider[] = [
  ipfsUploadProviders.NFT_STORAGE,
  ipfsUploadProviders.ESTUARY,
]

/**
 * @deprecated This function is deprecated in favor of `uploadFile` and `uploadDirectory`.
 */
export const upload = async (
  rawFile: File | string,
  options?: {
    onProgress?: (progress: number) => void
    cache?: boolean
  }
): Promise<IPFSUploadResponse & { pinning: boolean; hash: string }> => {
  const { onProgress } = {
    ...defaultOptions,
    ...options,
  }

  const isString = typeof rawFile === 'string'

  const file = isString
    ? new File([rawFile], 'file.txt', { type: 'text/plain' })
    : rawFile

  let cid

  if (!cid) {
    let lastError
    for (const uploadProvider of ipfsUploadProviderPriority) {
      console.info(uploadProvider.name, 'attempting upload')
      try {
        if (!cid) cid = await uploadProvider.upload(file, onProgress)
      } catch (e) {
        console.error('IPFS upload failed, provider:', uploadProvider.name)
        lastError = e
      }

      if (cid) break
    }

    if (!cid) throw lastError
  }

  if (cid) {
    await uploadApi.post('/pin', { cid, name: file.name })
  }

  if (!cid) {
    throw new Error('Could not find ipfs hash from upload')
  }

  const uri = `ipfs://${cid}`

  const hash = hashFiles([file])

  return { cid, uri, pinning: true, hash }
}
