import { IPFSProps, OrderedLayersProps } from 'src/typings'
import { BigNumber } from 'ethers'

interface ItemParam {
  propertyId: BigNumber
  name: string
  isNewProperty: boolean
}

interface IPFSGroup {
  baseUri: string
  extension: string
}

interface Properties {
  names: string[]
  items: ItemParam[]
  data: IPFSGroup
}

export function transformFileProperties(
  orderedLayers: OrderedLayersProps[],
  ipfsUpload: IPFSProps[],
  maxFilesPerTransaction = 500
): Properties[] {
  /*

    construct names param

*/
  const names = orderedLayers.map((name) => name.trait).reverse() // this is import for order sent to contract

  /*

        find properties per folder

     */
  const folders = names.map((name) =>
    ipfsUpload.filter((item: IPFSProps) => item.trait === name)
  )

  /*

        find at what index to split the names array

     */
  let currFileCount = 0
  const indexes = folders.reduce((acc, cv, idx) => {
    if (currFileCount + cv.length >= maxFilesPerTransaction) {
      acc.push(idx - 1)
      currFileCount = cv.length
      return acc
    }

    currFileCount += cv.length
    return acc
  }, [] as any)

  const _names: string[][] = ([] = names.reduceRight((result, value, index) => {
    result[0] = result[0] || []

    if (indexes.includes(index)) {
      result.unshift([value])
    } else {
      result[0].unshift(value)
    }

    return result
  }, [] as any))

  /*

       construct property objects per array of names (aka per transaction)

     */

  const _items: any = []
  for (const group of _names) {
    _items.push(
      group?.reduce((acc: ItemParam[] = [], cv: string) => {
        const _properties = ipfsUpload.filter((item: IPFSProps) => item.trait === cv)

        const properties = _properties.map((property) => ({
          propertyId: BigNumber.from(group.indexOf(property.trait)),
          name: property.name.substring(0, property.name.lastIndexOf('.')),
          isNewProperty: true,
        }))

        if (!properties.length) return

        return [...acc, ...properties]
      }, [])
    )
  }

  /*

        construct data argument for addProperties

     */
  const upload = ipfsUpload[0]
  const data = {
    baseUri: `ipfs://${upload?.ipfs?.cid}/`,
    extension: `${upload?.type
      ?.replace('image/', '.')
      .replace('+xml', '')
      .toLowerCase()}`,
  }

  /*

        return array of transactions

     */
  return _names.map((transaction, index) => ({
    items: _items[index],
    names: transaction,
    data,
  }))
}
