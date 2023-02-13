import { TTLCache } from '@brokerloop/ttlcache'
import { uploadApi } from './api'

const CACHE_TTL = 1000 * 60 * 60 // 1hr
const CACHE_KEY = 'EstuaryService:authorize'

type AuthorizeResp = {
  token: string
  shuttle: string
}

const cache = new TTLCache<typeof CACHE_KEY, AuthorizeResp>({
  ttl: CACHE_TTL,
})

export async function authorize() {
  const cached = cache.get(CACHE_KEY)
  if (cached) {
    const { token, shuttle } = cached

    return { token, shuttle }
  } else {
    const {
      data: { token, shuttle },
    } = await uploadApi.post('/authorize')

    cache.set(CACHE_KEY, { token, shuttle })

    return { token, shuttle }
  }
}
