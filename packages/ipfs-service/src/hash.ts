import * as crypto from 'crypto'

export function hashFiles(files: File[]): string {
  const hash = crypto.createHash('sha256')
  for (const file of files) {
    const simplifiedFile = {
      name: file.name,
      lastModified: file.lastModified,
      size: file.size,
      type: file.type,
    }
    hash.update(JSON.stringify(simplifiedFile))
  }
  return `0x${hash.digest('hex')}`
}
