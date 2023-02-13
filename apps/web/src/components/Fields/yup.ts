import { ethers } from 'ethers'

export function isValidAddress(this: any, message: any) {
  return this.test('isValidAddress', message, (value: string) => {
    const { path, createError } = this

    if (!ethers.utils.isAddress(value)) {
      return createError({ path, message: message ?? 'address provided is invalid.' })
    }

    return true
  })
}
