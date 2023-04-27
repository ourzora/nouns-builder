import NextImage from 'next/image'

export interface ImageProps {
  src: string
}

export const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <NextImage
      src={src}
      width={400}
      height={400}
      unoptimized
      alt="Preview"
      style={{
        objectFit: 'cover',
        borderRadius: '10px',
        height: '400px',
        width: '400px',
      }}
    />
  )
}
