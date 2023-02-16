import { describe, expect, it } from 'vitest'
import { mockIpfsUpload, mockOrderedLayers, mockTraits } from './mock'
import { transformFileProperties } from "./index";

describe('Transform Properties', () => {
  it('should return an empty array given no parameters', () => {
    const fileProperties = transformFileProperties([], [])

    expect(fileProperties).toEqual([])
  })

  it('should return an array of length 1 given a fileUploadCount less than the maxFiles', () => {
    const maxFiles = 500
    const orderedLayers = mockOrderedLayers(mockTraits)
    const ipfsUpload = mockIpfsUpload(300, mockTraits)
    const fileProperties = transformFileProperties(orderedLayers, ipfsUpload, maxFiles)
    expect(fileProperties).toHaveLength(1)
  })

  it('should return an array of length Math.ceil(fileUploadCount/maxFiles), in this case 2', () => {
    const maxFiles = 500
    const orderedLayers = mockOrderedLayers(mockTraits)
    const ipfsUpload = mockIpfsUpload(700, mockTraits)
    const fileProperties = transformFileProperties(orderedLayers, ipfsUpload, maxFiles)
    expect(fileProperties).toHaveLength(2)
  })

  it('should return an array of length Math.ceil(fileUploadCount/maxFiles), in this case 10', () => {
    const maxFiles = 500
    const orderedLayers = mockOrderedLayers(mockTraits)
    const ipfsUpload = mockIpfsUpload(4561, mockTraits)
    const fileProperties = transformFileProperties(orderedLayers, ipfsUpload, maxFiles)

    expect(fileProperties).toHaveLength(10)
  })

  it('should return items as an array of objects with type ItemParam', () => {
    const maxFiles = 500
    const orderedLayers = mockOrderedLayers(mockTraits)
    const ipfsUpload = mockIpfsUpload(maxFiles, mockTraits)
    const fileProperties = transformFileProperties(orderedLayers, ipfsUpload, maxFiles)

    for (const property of fileProperties) {
      expect(property).toHaveProperty('items')
      expect(property).toHaveProperty('names')
      expect(property).toHaveProperty('data')
    }
  })

  it('should return names as an array of strings', () => {
    const maxFiles = 500
    const orderedLayers = mockOrderedLayers(mockTraits)
    const ipfsUpload = mockIpfsUpload(maxFiles, mockTraits)
    const fileProperties = transformFileProperties(orderedLayers, ipfsUpload, maxFiles)

    for (const property of fileProperties) {
      const names = property.names
      for (const name of names) {
        expect(name).toSatisfy((value) => typeof value === 'string')
      }
    }
  })

  it('should return items as an array of Item Params', () => {
    const maxFiles = 500
    const orderedLayers = mockOrderedLayers(mockTraits)
    const ipfsUpload = mockIpfsUpload(maxFiles, mockTraits)
    const fileProperties = transformFileProperties(orderedLayers, ipfsUpload, maxFiles)

    for (const property of fileProperties) {
      const items = property.items
      for (const item of items) {
        expect(item).toHaveProperty('propertyId')
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('isNewProperty')
      }
    }
  })

  it('should return data as an IPFSGroup object', () => {
    const maxFiles = 500
    const orderedLayers = mockOrderedLayers(mockTraits)
    const ipfsUpload = mockIpfsUpload(maxFiles, mockTraits)
    const fileProperties = transformFileProperties(orderedLayers, ipfsUpload, maxFiles)

    for (const property of fileProperties) {
      const data = property.data
      expect(data).toHaveProperty('baseUri')
      expect(data).toHaveProperty('extension')
    }
  })
})