export const getBaseUrl = () => {
  const env = process.env.VERCEL_ENV || 'development'
  const protocol = env === 'development' ? 'http' : 'https'
  const url = process.env.VERCEL_URL || 'localhost:3000'
  return `${protocol}://${url}`
}
