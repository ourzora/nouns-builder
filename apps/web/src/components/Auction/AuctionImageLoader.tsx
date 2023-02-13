import ContentLoader from 'react-content-loader'

const ImageLoader = () => (
  <ContentLoader
    speed={2}
    style={{ borderRadius: 12 }}
    width="100%"
    height="100%"
    viewBox="0 0 464 464"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="12" ry="12" width="464" height="464" />
  </ContentLoader>
)

export default ImageLoader
