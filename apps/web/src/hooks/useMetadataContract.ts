import { base64 } from 'ethers/lib/utils'
import { useCallback } from 'react'
import { metadataAbi } from 'src/data/contract/abis'
import type { AddressType } from 'src/typings'
import { useContract, useContractReads, useSigner } from 'wagmi'

export function useMetadataContract(address?: AddressType) {
  const params = {
    address: address,
    abi: metadataAbi,
  }

  const { data: signer } = useSigner()

  const contract = useContract({
    ...params,
    signerOrProvider: signer,
  })

  const fnNames = [
    'description',
    'contractImage',
    'projectURI',
    'contractURI',
    'rendererBase',
  ]

  const updateDescription = useCallback(
    (_description: string) => contract?.updateDescription(_description),
    [contract]
  )

  const updateContractImage = useCallback(
    (_contractImage: string) => contract?.updateContractImage(_contractImage),
    [contract]
  )

  const updateProjectURI = useCallback(
    (_projectURI: string) => contract?.updateProjectURI(_projectURI),
    [contract]
  )

  const updateRendererBase = useCallback(
    (_rendererBase: string) => contract?.updateRendererBase(_rendererBase),
    [contract]
  )

  function parseContractURI(uri: unknown) {
    try {
      const [, parsedUri] = (uri as string).split(',')
      if (!parsedUri) {
        throw new Error('error parsing contract URI')
      }
      const bufferString = new Buffer(base64.decode(parsedUri)).toString()
      return JSON.parse(bufferString)
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  const { data } = useContractReads({
    contracts: fnNames.map((functionName) => ({ ...params, functionName })),
    enabled: typeof params.address !== 'undefined',
  })

  if (!data) {
    return {
      contract: contract || undefined,
      daoImage: undefined,
      daoWebsite: undefined,
      updateDescription: undefined,
      updateContractImage: undefined,
      updateProjectURI: undefined,
      rendererBase: undefined,
      contractURI: undefined,
      updateRendererBase: undefined,
      description: undefined,
    }
  }

  const [description, daoImage, daoWebsite, contractURI, rendererBase] =
    data as unknown[] as string[]

  return {
    contract: contract || undefined,
    daoImage,
    daoWebsite,
    updateDescription,
    updateContractImage,
    updateProjectURI,
    rendererBase,
    contractURI: parseContractURI(contractURI),
    updateRendererBase,
    description,
  }
}
