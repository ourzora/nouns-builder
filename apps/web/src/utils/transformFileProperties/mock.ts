export const mockTraits = ['backgrounds', 'bodies', 'heads', 'glasses', 'shirt']
export const layerProperties = ['property-one', 'property-two', 'property-three']

export const mockOrderedLayers = (traits: string[]) => {
  return traits.map((trait) => {
    return { trait: trait, properties: layerProperties }
  })
}

export const mockIpfsUpload = (filesUploadCount = 500, traits: string[]) => {
  let upload = []
  for (let i = 0; i < filesUploadCount; i++) {
    const random = (max: any[]) => Math.floor(Math.random() * max.length)
    const randomTrait = traits[random(traits)]

    upload.push(ipfsUploadObject(randomTrait))
  }
  return upload
}

const ipfsUploadObject = (trait: string) => {
  return {
    name: 'glasses-square-teal.png',
    property: 'glasses-square-teal.png',
    collection: 'nouns',
    content: {} as File,
    blob: 'blob:http://localhost:3000/a184d324-0279-4c32-955a-744e9e324916',
    trait: trait,
    webkitRelativePath: 'nouns/4-glasses/glasses-square-teal.png',
    type: 'image/png',
    ipfs: {
      uri: 'ipfs://bafybeihcsfjvnjmzivm4gxgt75zwajtfxumyxd7j6ibvloykpg4sx47uca/4-glasses/glasses-square-teal.png',
      url: 'https://nftstorage.link/ipfs/bafybeihcsfjvnjmzivm4gxgt75zwajtfxumyxd7j6ibvloykpg4sx47uca/4-glasses/glasses-square-teal.png',
      cid: 'bafybeihcsfjvnjmzivm4gxgt75zwajtfxumyxd7j6ibvloykpg4sx47uca',
      pinning: true,
    },
  }
}
