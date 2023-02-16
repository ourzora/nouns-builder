import { IPFSProps, OrderedLayersProps } from 'src/typings'
import { BigNumber } from "ethers";

export interface ItemParam {
  propertyId: BigNumber
  name: string
  isNewProperty: boolean
}

export interface IPFSGroup {
  baseUri: string
  extension: string
}

export interface Properties {
  names: string[]
  items: ItemParam[]
  data: IPFSGroup
}

export function transformFileProperties(
  orderedLayers: OrderedLayersProps[],
  ipfsUpload: IPFSProps[],
  maxFilesPerTransaction = 500
): Properties[] {
  // construct names array
  const names = orderedLayers.map((name) => name.trait).reverse() // this reverse is import for order sent to contract

  // check each folder is less than maxFilesPerTransaction, if not
  // transform into array of IPFSProps that are less tha maxFilesPerTransaction
  const sanitizeFolders = () => {
    const foldersByName = names.map((name) =>
      ipfsUpload.filter((item: IPFSProps) => item.trait === name)
    )

    const sanitizedFolders = foldersByName.reduce((acc: IPFSProps[][], cv, idx) => {
      /*
         if a folder has more files than allowed per transaction
         split folder into additional folders with < maxFilesPerTransaction
       */
      if (cv.length < maxFilesPerTransaction) {
        acc.push(cv)
      } else {
        const additionalFolderCount = Math.ceil(cv.length / maxFilesPerTransaction)
        const spliceIndex = Math.ceil(cv.length / additionalFolderCount)

        let additionalFolders = []
        for (let i = 0; i < additionalFolderCount; i++) {
          if (i + 1 === additionalFolderCount) {
            additionalFolders.push(cv)
          } else {
            additionalFolders.push(cv.splice(-spliceIndex))
          }
        }
        acc.push(...additionalFolders)
      }

      return acc
    }, [])

    return [...sanitizedFolders]
  }
  const folders = sanitizeFolders()

  // find at what index to split the folders array
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

  //construct names array for each transaction
  const _names: string[][] = ([] = folders.reduceRight((result, value, index) => {
    result[0] = result[0] || []

    const includedProperties = value
      .map((value) => value.trait)
      .filter(
        (element: string, index: number, array: string[]) =>
          array.indexOf(element) === index
      )

    if (indexes.includes(index)) {
      result.unshift([...includedProperties])
    } else {
      result[0].unshift(...includedProperties)
    }

    return result
  }, [] as any))

  // construct property objects per array of names (aka per transaction)
  const _items: any = []
  for (const group of _names) {
    _items.push(
      group?.reduce((acc: ItemParam[] = [], cv: string) => {
        const _properties = ipfsUpload.filter((item: IPFSProps) => item.trait === cv)

        const properties = _properties.map((property) => ({
          propertyId: BigNumber.from(group.indexOf(property.trait).toString()),
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