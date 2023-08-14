import { sendTransaction } from '@wagmi/core'
import { Box, Button, Flex, Heading, Text } from '@zoralabs/zord'
import { parseEther } from 'ethers/lib/utils.js'
import { Formik } from 'formik'
import Image from 'next/image'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'

import Input from 'src/components/Input/Input'
import { L2ChainType, PUBLIC_L1_BRIDGE_ADDRESS } from 'src/constants/addresses'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { useBridgeModal } from 'src/hooks/useBridgeModal'
import { useChainStore } from 'src/stores/useChainStore'
import { formatCryptoVal } from 'src/utils/numbers'

import { Icon } from '../Icon'
import bridgeFormSchema, { BridgeFormValues } from './BridgeForm.schema'

export const BridgeForm = () => {
  const { chain: l2Chain } = useChainStore()
  const { address } = useAccount()
  const { chain: userChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { closeBridgeModal } = useBridgeModal()

  const l1Chain = PUBLIC_DEFAULT_CHAINS[0]

  const isWalletOnL1 = userChain?.id === l1Chain.id

  const { data: userL1Balance } = useBalance({
    address,
    chainId: l1Chain.id,
  })

  const { data: userL2Balance } = useBalance({
    address,
    chainId: l2Chain.id,
  })

  const initialValues: BridgeFormValues = {
    amount: 0,
  }

  const handleSubmit = async (values: BridgeFormValues) => {
    const bridge = PUBLIC_L1_BRIDGE_ADDRESS[l2Chain.id as L2ChainType]

    if (!values.amount || !bridge) return
    const { wait } = await sendTransaction({
      request: {
        to: PUBLIC_L1_BRIDGE_ADDRESS[l2Chain.id as L2ChainType],
        value: parseEther(values.amount.toString()),
      },
      mode: 'recklesslyUnprepared',
    })
    await wait()
  }

  const formattedL1Balance = userL1Balance ? parseFloat(userL1Balance.formatted) : 0
  const formattedL2Balance = userL2Balance ? parseFloat(userL2Balance.formatted) : 0

  return (
    <Box position={'relative'}>
      <Box
        onClick={closeBridgeModal}
        cursor={'pointer'}
        position={'absolute'}
        top="x0"
        right="x3"
      >
        <Icon id="cross" fill="text3" />
      </Box>
      <Heading size="xs" fontWeight="display">
        Bridge
      </Heading>
      <Text mt="x5" color="text2">
        Bridge ETH to participate in onchain governance and auctions on L2 chains.
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={bridgeFormSchema(formattedL1Balance)}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnMount={false}
        validateOnChange={true}
      >
        {({ errors, touched, isValid, submitForm }) => {
          const isAmountInvalid = !!errors.amount && touched.amount

          return (
            <Box>
              <Box
                mt="x5"
                p="x4"
                borderColor="border"
                borderStyle="solid"
                borderRadius="curved"
                borderWidth="normal"
              >
                <Input
                  name={'amount'}
                  label={
                    <Flex>
                      <Text mr="x2" fontWeight="heading">
                        From
                      </Text>
                      <Box mr="x1">
                        <Image
                          alt="L1 Chain"
                          style={{
                            height: 20,
                            width: 20,
                          }}
                          src={l1Chain.icon}
                        />
                      </Box>
                      <Text fontWeight="heading">{l1Chain.name}</Text>
                    </Flex>
                  }
                  secondaryLabel={'ETH'}
                  autoComplete={'off'}
                  type={'number'}
                  placeholder={0}
                  min={0}
                  max={userL1Balance?.formatted}
                  step={'any'}
                />
                <Text mt="x3" color="text3">
                  Balance: {formatCryptoVal(formattedL1Balance)} ETH
                </Text>
              </Box>

              <Flex mt="x3" w="100%" align={'center'} justify={'space-around'}>
                <Icon id="arrowDown" />
              </Flex>

              <Box
                mt="x3"
                p="x4"
                borderColor="border"
                borderStyle="solid"
                borderRadius="curved"
                borderWidth="normal"
              >
                <Input
                  name={'amount'}
                  label={
                    <Flex>
                      <Text mr="x2" fontWeight="heading">
                        To
                      </Text>
                      <Box mr="x1">
                        <Image
                          alt="L2 Chain"
                          style={{
                            height: 20,
                            width: 20,
                          }}
                          src={l2Chain.icon}
                        />
                      </Box>
                      <Text fontWeight="heading">{l2Chain.name}</Text>
                    </Flex>
                  }
                  secondaryLabel={'ETH'}
                  autoComplete={'off'}
                  type={'number'}
                  placeholder={0}
                  min={0}
                  max={userL2Balance?.formatted}
                  step={'any'}
                />
                <Text mt="x3" color="text3">
                  Balance: {formatCryptoVal(formattedL2Balance)} ETH
                </Text>
              </Box>

              {isWalletOnL1 ? (
                <Button
                  disabled={!isValid}
                  onClick={submitForm}
                  type="submit"
                  w="100%"
                  mt="x5"
                >
                  {isAmountInvalid ? 'Insufficent ETH balance' : 'Bridge'}
                </Button>
              ) : (
                <Button
                  onClick={() => switchNetwork?.(l1Chain.id)}
                  type="button"
                  w="100%"
                  mt="x5"
                >
                  Switch network
                </Button>
              )}
            </Box>
          )
        }}
      </Formik>
    </Box>
  )
}
