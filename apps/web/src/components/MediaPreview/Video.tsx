export interface VideoProps {
  url: string
}

export const Video: React.FC<VideoProps> = ({ url }) => {
  return (
    <video
      src={url}
      autoPlay
      loop
      muted={true}
      playsInline
      style={{ objectFit: 'contain' }}
    />
  )
}
