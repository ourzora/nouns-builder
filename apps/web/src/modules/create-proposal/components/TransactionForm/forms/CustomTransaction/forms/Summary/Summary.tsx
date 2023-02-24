import {
  defaultBackButtonVariants,
  transactionFormButtonWithPrev,
} from '../../styles.css'
import { Button, Flex, Stack } from '@zoralabs/zord'
import { ethers } from 'ethers'
import React from 'react'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import { getEnsAddress } from 'src/utils/ens'
import { matchTypeParameters, normalizePathName, RAW_DATA_KEY } from 'src/utils/formABI'
import { useCustomTransactionStore } from 'src/modules/create-proposal/stores/useCustomTransactionStore'
import { walletSnippet } from 'src/utils/helpers'
import CopyButton from 'src/components/CopyButton/CopyButton'

interface SummaryProps {
  title: string
  setIsOpen?: (bool: boolean) => void
}

export const Summary: React.FC<SummaryProps> = ({ title, setIsOpen }) => {
  const { signer, provider } = useLayoutStore()
  const { customTransaction, composeCustomTransaction, previous } =
    useCustomTransactionStore()

  /*

    construct calldata from customTransaction values

   */

  // This is where calldata are constructed using the contract builder
  const calldata = React.useMemo(() => {
    const rawData = customTransaction.arguments?.find(
      ([name]: [string, string]) => name === RAW_DATA_KEY
    )
    if (rawData) {
      return rawData[1]
    }

    if (!signer || !customTransaction?.contract?.abi) return

    const contract = new ethers.Contract(
      customTransaction?.address,
      customTransaction?.contract?.abi,
      signer
    )

    const args: [string, string][] = customTransaction.arguments

    const inputsList = [...customTransaction.function.inputs]
    const annotateInput = (path: string[], inputs: any) =>
      inputs.map((input: any) => {
        if (input.type === 'tuple') {
          return annotateInput([...path, input.name], input.components)
        } else {
          return {
            name: normalizePathName(input.name, path),
            type: input.type,
          }
        }
      })
    const inputData = annotateInput([], inputsList)

    function insertValues(inputData: any) {
      return inputData.map((data: any) => {
        if (Array.isArray(data)) {
          return insertValues(data)
        } else {
          const [_, value] = args.find(([name]) => data.name === name)!
          if (matchTypeParameters(data.type).isArray) {
            return value.replace(/\s/g, '').split(',')
          }
          return value
        }
      })
    }

    const values = insertValues(inputData)

    try {
      return contract.interface.encodeFunctionData(
        customTransaction.function.name,
        values
      )
    } catch (err) {
      console.error(err)
      return
    }
  }, [customTransaction, signer])

  /*
    
    handle add transaction to Proposal
  
   */

  const handleAddTransaction = React.useCallback(async () => {
    const address = await getEnsAddress(customTransaction.address, provider)
    if (!calldata) {
      if (customTransaction.address && customTransaction.value) {
        composeCustomTransaction({
          ...customTransaction,
          address,
          function: {
            name: 'sendEth(address)',
            inputs: [],
          },
          calldata: '0x',
        })
      }
    } else {
      let override = {}
      if (!customTransaction.contract) {
        override = {
          function: {
            name: 'call(address,calldata)',
            inputs: [],
          },
        }
      }
      composeCustomTransaction({
        ...customTransaction,
        ...override,
        address,
        calldata: calldata,
      })
    }

    setIsOpen && setIsOpen(false)
  }, [calldata])

  const argumentsList = customTransaction.arguments?.filter(
    ([_, value]: [string, string]) => !!value
  )

  /*
    
    Parse argument Map for Human Readable display
  
   */

  return (
    <Flex direction={'column'} gap={'x2'}>
      <Flex justify={'space-between'} align={'center'} gap={'x4'}>
        <Flex fontWeight={'label'}>Address</Flex>
        <Flex align={'center'}>
          {walletSnippet(customTransaction?.address)}
          <CopyButton text={customTransaction?.address as string} />
        </Flex>
      </Flex>
      <Flex justify={'space-between'} align={'center'}>
        <Flex fontWeight={'label'}>Value</Flex>
        <Flex>{customTransaction?.value} ETH</Flex>
      </Flex>
      <Flex justify={'space-between'} align={'center'}>
        <Flex fontWeight={'label'}>Function</Flex>
        <Flex>{customTransaction?.function.name}</Flex>
      </Flex>
      <Flex justify={'space-between'} align={'center'} mb={'x4'}>
        <Flex fontWeight={'label'}>Arguments</Flex>
        {argumentsList && (
          <Flex direction={'column'} style={{ overflowWrap: 'anywhere' }}>
            {argumentsList.map((arg: any, index: number) => (
              <Flex as="ol" key={index}>
                {' '}
                <Stack as={'li'}>
                  <Flex>
                    <strong>{arg[0]}</strong>
                  </Flex>
                  <Flex>{arg[1]}</Flex>
                </Stack>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
      <Flex>
        <Flex
          justify={'center'}
          align={'center'}
          px={'x4'}
          py={'x2'}
          onClick={() => previous()}
          className={defaultBackButtonVariants['transaction']}
        >
          Back
        </Flex>
        <Button
          h={'x15'}
          className={transactionFormButtonWithPrev}
          type={'button'}
          onClick={() => handleAddTransaction()}
        >
          Add Transaction
        </Button>
      </Flex>
    </Flex>
  )
}
