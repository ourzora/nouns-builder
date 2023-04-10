import { Box } from '@zoralabs/zord'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/image'
import { useMemo } from 'react'

import { Video } from './Video'

export interface MediaPreviewProps {
  mediaUrl: string
  mediaType?: string
  coverUrl?: string
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  mediaType,
  mediaUrl,
  coverUrl,
}) => {
  const fetchableMediaURL = useMemo(() => getFetchableUrl(mediaUrl) || '', [mediaUrl])
  const fetchableCoverURL = useMemo(() => getFetchableUrl(coverUrl) || '', [coverUrl])

  if (mediaType?.startsWith('image')) {
    return (
      <Image
        src={fetchableMediaURL}
        fill
        alt="Preview"
        style={{
          objectFit: 'contain',
        }}
      />
    )
  }

  if (mediaType?.startsWith('video')) {
    return <Video url={fetchableMediaURL} />
  }

  return <Box backgroundColor="backdrop" w="100%" h="100%" />
}
