import { hashFiles } from './hash'

const defaultOptions = {
  onProgress: undefined,
  cache: true,
}

export type IPFSUploadResponse = {
  cid: string
  uri: string
}

type ProgressCallback = (progress: number) => void

function uploadFileWithProgress(
  data: FormData,
  onProgress: (progress: number) => void
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest()

    const uploadKey = await fetch('/api/upload-key', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    })

    if (!uploadKey.ok) {
      reject('No KEY')
    }
    const { JWT: jwt } = await uploadKey.json()

    xhr.open('POST', 'https://api.pinata.cloud/pinning/pinFileToIPFS', true)
    xhr.setRequestHeader('Authorization', `Bearer ${jwt}`)

    // Add event listener to track upload progress
    xhr.upload.onprogress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100
        onProgress(progress) // Call the progress callback
      }
    }

    // Handle successful upload
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const jsonResponse = JSON.parse(xhr.responseText)
        resolve(jsonResponse)
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`))
      }
    }

    // Handle errors
    xhr.onerror = () => {
      reject(new Error('An error occurred during the upload.'))
    }

    // Send the FormData
    xhr.send(data)
  })
}

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

  const data = new FormData()
  data.append('file', file)

  const response = (await uploadFileWithProgress(data, (progress) => {
    console.log(`Upload progress: ${progress}%`)
    // You can also update the UI with the progress here
    if (typeof onProgress === 'function') {
      onProgress(progress)
    }
  })) as any

  console.log({ response })

  const cid = response.IpfsHash.toString()
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

  const data = new FormData()
  entries.forEach((file) => {
    console.log({ file })
    data.append('file', file.content, `builder/${file.path}`)
  })
  data.append(
    'pinataOptions',
    JSON.stringify({
      cidVersion: 1,
    })
  )
  data.append(
    'pinataMetadata',
    JSON.stringify({
      name: 'builder',
    })
  )

  const response = (await uploadFileWithProgress(data, (progress) => {
    console.log(`Upload progress: ${progress}%`)
    // You can also update the UI with the progress here
    if (typeof onProgress === 'function') {
      onProgress(progress)
    }
  })) as any

  console.log({ response })

  const cid = response.IpfsHash.toString()
  const uri = `ipfs://${cid}`

  console.info('ipfs-service/uploadDirectory', { cid })

  uploadCache.put(files, cid)

  return {
    uri,
    cid,
  }
}
