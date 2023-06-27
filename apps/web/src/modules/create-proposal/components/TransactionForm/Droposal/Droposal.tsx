import { Stack } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import { FormikHelpers } from 'formik'
import { useContract } from 'wagmi'

import { PUBLIC_ZORA_NFT_CREATOR } from 'src/constants/addresses'
import { zoraNFTCreatorAbi } from 'src/data/contract/abis/ZoraNFTCreator'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType } from 'src/typings'

import { DroposalForm } from './DroposalForm'
import { DroposalFormValues } from './DroposalForm.schema'

const UINT_64_MAX = BigNumber.from('18446744073709551615')
const UINT_32_MAX = BigNumber.from('4294967295')

export const Droposal: React.FC = () => {
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const chain = useChainStore((x) => x.chain)
  const zoraNFTCreatorContract = useContract({
    abi: zoraNFTCreatorAbi,
    address: chain && PUBLIC_ZORA_NFT_CREATOR[chain.id],
  })

  const handleDroposalTransaction = (
    values: DroposalFormValues,
    actions: FormikHelpers<DroposalFormValues>
  ) => {
    if (!chain) return
    const {
      name,
      symbol,
      maxSupply: editionSize,
      royaltyPercentage,
      fundsRecipient,
      defaultAdmin,
      pricePerMint: publicSalePrice,
      maxPerAddress: maxSalePurchasePerAddress,
      publicSaleStart,
      publicSaleEnd,
      description,
      mediaUrl,
      mediaType,
      coverUrl,
    } = values

    const royaltyBPS = royaltyPercentage * 100
    const salesConfig = [
      ethers.utils.parseEther((publicSalePrice || 0).toString()),
      maxSalePurchasePerAddress || UINT_32_MAX,
      BigNumber.from(Math.floor(new Date(publicSaleStart).getTime() / 1000)),
      BigNumber.from(Math.floor(new Date(publicSaleEnd).getTime() / 1000)),
      0, // presaleStart
      0, // presaleEnd
      ethers.constants.HashZero, // presaleMerkleRoot
    ]
    const animationUri = mediaType?.startsWith('image') ? '' : mediaUrl
    const imageUri = mediaType?.startsWith('image') ? mediaUrl : coverUrl

    const createEdition = {
      target: PUBLIC_ZORA_NFT_CREATOR[chain.id] as AddressType,
      functionSignature: 'createEdition()',
      calldata:
        zoraNFTCreatorContract?.interface.encodeFunctionData(
          'createEdition(string,string,uint64,uint16,address,address,(uint104,uint32,uint64,uint64,uint64,uint64,bytes32),string,string,string)',
          [
            name,
            symbol,
            editionSize || UINT_64_MAX,
            royaltyBPS,
            fundsRecipient,
            defaultAdmin,
            salesConfig,
            description,
            animationUri,
            imageUri,
          ]
        ) || '',
      value: '',
    }

    addTransaction({
      type: TransactionType.DROPOSAL,
      summary: 'Create a droposal',
      transactions: [createEdition],
    })

    actions.resetForm()
  }

  return (
    <Stack>
      <DroposalForm
        onSubmit={handleDroposalTransaction}
        disabled={typeof zoraNFTCreatorContract === 'undefined'}
      />
    </Stack>
  )
}
