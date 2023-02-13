/**
 *
 * Unslugify
 *
 */

export const unslugify = (slug: string) => {
  const result = slug.replace(/-/g, ' ')
  return result.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
