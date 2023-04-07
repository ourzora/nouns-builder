import { Stack } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import { FormikHelpers } from 'formik'
import { useContract } from 'wagmi'

import { PUBLIC_ZORA_NFT_CREATOR } from 'src/constants/addresses'
import { zoraNFTCreatorAbi } from 'src/data/contract/abis/ZoraNFTCreator'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useDaoStore } from 'src/modules/dao'
import { AddressType } from 'src/typings'

import { DroposalForm } from './DroposalForm'
import { DroposalFormValues } from './DroposalForm.schema'

export const Droposal: React.FC = () => {
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const { treasury } = useDaoStore((state) => state.addresses)
  const zoraNFTCreatorContract = useContract({
    abi: zoraNFTCreatorAbi,
    address: PUBLIC_ZORA_NFT_CREATOR,
  })

  const handleDroposalTransaction = (
    values: DroposalFormValues,
    actions: FormikHelpers<DroposalFormValues>
  ) => {
    const {
      name,
      symbol,
      maxSupply: editionSize,
      royaltyPercentage,
      fundsRecipient,
      pricePerMint: publicSalePrice,
      maxPerAddress: maxSalePurchasePerAddress,
      publicSaleStart,
      publicSaleEnd,
      description,
    } = values

    const royaltyBPS = royaltyPercentage * 100
    const defaultAdmin = treasury
    const salesConfig = [
      ethers.utils.parseEther((publicSalePrice || 0).toString()),
      maxSalePurchasePerAddress,
      BigNumber.from(Math.floor(new Date(publicSaleStart).getTime() / 1000)),
      BigNumber.from(Math.floor(new Date(publicSaleEnd).getTime() / 1000)),
      0, // presaleStart
      0, // presaleEnd
      ethers.constants.HashZero, // presaleMerkleRoot
    ]
    const animationUri = ''
    const imageUri = ''

    const createEdition = {
      target: PUBLIC_ZORA_NFT_CREATOR as AddressType,
      functionSignature: 'createEdition()',
      calldata:
        zoraNFTCreatorContract?.interface.encodeFunctionData(
          'createEdition(string,string,uint64,uint16,address,address,(uint104,uint32,uint64,uint64,uint64,uint64,bytes32),string,string,string)',
          [
            name,
            symbol,
            editionSize,
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
