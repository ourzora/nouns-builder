import { IPFSUpload, OrderedLayersProps } from 'src/typings'

export const mockTraits = ['backgrounds', 'bodies', 'heads', 'glasses', 'shirt']
export const layerProperties = ['property-one', 'property-two', 'property-three']

export const mockOrderedLayers = (traits: string[]): OrderedLayersProps[] => {
  return traits.map((trait) => {
    return { trait: trait, properties: layerProperties }
  })
}

export const mockIpfsUpload = (
  filesUploadCount = 500,
  traits: string[]
): IPFSUpload[] => {
  let upload = []
  for (let i = 0; i < filesUploadCount; i++) {
    const random = (max: any[]) => Math.floor(Math.random() * max.length)
    const randomTrait = traits[random(traits)]

    upload.push(ipfsUploadObject(randomTrait))
  }
  return upload
}

export const ipfsUploadObject = (trait: string): IPFSUpload => {
  return {
    name: 'glasses-square-teal.png',
    content: {} as File,
    blob: 'blob:http://localhost:3000/a184d324-0279-4c32-955a-744e9e324916',
    trait: trait,
    webkitRelativePath: 'nouns/4-glasses/glasses-square-teal.png',
    type: 'image/png',
    ipfs: {
      uri: 'ipfs://bafybeihcsfjvnjmzivm4gxgt75zwajtfxumyxd7j6ibvloykpg4sx47uca/4-glasses/glasses-square-teal.png',
      cid: 'bafybeihcsfjvnjmzivm4gxgt75zwajtfxumyxd7j6ibvloykpg4sx47uca',
    },
  }
}
