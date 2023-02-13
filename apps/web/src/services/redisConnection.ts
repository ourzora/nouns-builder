import Redis from 'ioredis'

export const getRedisConnection = (): Redis | undefined => {
  if (!process.env.PRIVATE_REDIS_CONNECTION_URI) return

  return new Redis(process.env.PRIVATE_REDIS_CONNECTION_URI)
}
