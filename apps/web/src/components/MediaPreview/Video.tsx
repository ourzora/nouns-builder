export interface VideoProps {
  src: string
}

export const Video: React.FC<VideoProps> = ({ src }) => {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted={true}
      playsInline
      style={{
        objectFit: 'cover',
        borderRadius: '10px',
        height: '400px',
        width: '400px',
      }}
    />
  )
}
