import { Box, Button, Flex } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import type { FormikHelpers } from 'formik'
import { getAddress } from 'viem'
import { useBalance } from 'wagmi'

import { Icon } from 'src/components/Icon'
import Input from 'src/components/Input/Input'
import { TransactionType, useProposalStore } from 'src/modules/create-proposal'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
import { CHAIN_ID } from 'src/typings'
import { getEnsAddress } from 'src/utils/ens'
import { walletSnippet } from 'src/utils/helpers'
import { getProvider } from 'src/utils/provider'

import sendEthSchema, { SendEthValues } from './SendEth.schema'

export const SendEth = () => {
  const { treasury } = useDaoStore((state) => state.addresses)
  const chain = useChainStore((x) => x.chain)
  const { data: treasuryBalance } = useBalance({
    address: treasury,
    chainId: chain.id,
  })
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const initialValues: SendEthValues = {
    recipientAddress: '',
    amount: 0,
  }

  const handleSubmit = async (
    values: SendEthValues,
    actions: FormikHelpers<SendEthValues>
  ) => {
    if (!values.amount || !values.recipientAddress) return

    const target = await getEnsAddress(
      values.recipientAddress,
      getProvider(CHAIN_ID.ETHEREUM)
    )
    const value = values.amount.toString()

    addTransaction({
      type: TransactionType.SEND_ETH,
      summary: `Send ${value} ETH to ${walletSnippet(target)}`,
      transactions: [
        {
          functionSignature: 'sendEth(address)',
          target: getAddress(target),
          value,
          calldata: '0x',
        },
      ],
    })

    actions.resetForm()
  }

  return (
    <Box w={'100%'}>
      {treasuryBalance && (
        <Formik
          initialValues={initialValues}
          validationSchema={sendEthSchema(parseFloat(treasuryBalance.formatted))}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnMount={false}
          validateOnChange={false}
        >
          {({ errors, touched, isValid, isValidating, dirty }) => (
            <Box
              data-testid="airdrop-form"
              as={'fieldset'}
              disabled={isValidating}
              style={{ outline: 0, border: 0, padding: 0, margin: 0 }}
            >
              <Flex as={Form} direction={'column'}>
                <Input
                  name={'recipientAddress'}
                  label={'Recipient Wallet Address/ENS'}
                  type={'text'}
                  placeholder={'0x...'}
                  autoComplete={'off'}
                  secondaryLabel={
                    <Icon
                      id={'checkInCircle'}
                      fill={'positive'}
                      style={{
                        opacity:
                          typeof errors.recipientAddress === 'undefined' && dirty ? 1 : 0,
                        transition: '0.1s opacity',
                      }}
                    />
                  }
                  error={
                    touched.recipientAddress && errors.recipientAddress
                      ? errors.recipientAddress
                      : undefined
                  }
                />

                <Box mt={'x5'}>
                  <Input
                    name={'amount'}
                    label={
                      <Flex justify={'space-between'}>
                        <Box fontWeight={'label'}>Amount</Box>
                        <Box color={'text3'}>
                          Treasury Balance: {`${treasuryBalance?.formatted} ETH`}
                        </Box>
                      </Flex>
                    }
                    secondaryLabel={'ETH'}
                    autoComplete={'off'}
                    type={'number'}
                    placeholder={0}
                    min={0}
                    max={treasuryBalance?.formatted}
                    step={'any'}
                    error={touched.amount && errors.amount ? errors.amount : undefined}
                  />
                </Box>

                <Button
                  mt={'x9'}
                  variant={'outline'}
                  borderRadius={'curved'}
                  type="submit"
                  disabled={!isValid}
                >
                  Add Transaction to Queue
                </Button>
              </Flex>
            </Box>
          )}
        </Formik>
      )}
    </Box>
  )
}
