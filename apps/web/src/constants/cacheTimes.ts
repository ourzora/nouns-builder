const ONE_MINUTE = 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24

export const CACHE_TIMES = {
  DAO_INFO: {
    maxAge: ONE_MINUTE,
    swr: ONE_DAY,
  },
  TOKEN_INFO: {
    maxAge: ONE_MINUTE,
    swr: ONE_DAY,
  },
  PROPOSAL: {
    maxAge: ONE_HOUR,
    swr: ONE_DAY,
  },
}
