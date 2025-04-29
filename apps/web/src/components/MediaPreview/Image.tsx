import NextImage from 'next/image'

export interface ImageProps {
  src: string
  alt?: string
}

export const Image: React.FC<ImageProps> = ({ src, alt = 'Preview' }) => {
  return (
    <NextImage
      src={src}
      width={400}
      height={400}
      unoptimized
      alt={alt}
      style={{
        objectFit: 'cover',
        borderRadius: '10px',
        height: '400px',
        width: '400px',
      }}
    />
  )
}
