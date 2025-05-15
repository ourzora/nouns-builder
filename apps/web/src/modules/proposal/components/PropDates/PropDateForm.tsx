import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import { InvoiceMetadata } from '@smartinvoicexyz/types'
import { Box, Button, Flex, Select, Text } from '@zoralabs/zord'
import { Form, Formik, type FormikProps, useFormikContext } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { type Hex, getAddress, isAddress, zeroHash } from 'viem'
import {
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import * as Yup from 'yup'

import { Avatar } from 'src/components/Avatar'
import SmartInput from 'src/components/Fields/SmartInput'
import { defaultInputLabelStyle } from 'src/components/Fields/styles.css'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import {
  EAS_CONTRACT_ADDRESS,
  PROPDATE_SCHEMA,
  PROPDATE_SCHEMA_UID,
} from 'src/constants/eas'
import { MessageType, type PropDate } from 'src/data/eas/requests/getPropDates'
import { useEnsData } from 'src/hooks'
import { useDaoStore } from 'src/modules/dao/stores'
import { CHAIN_ID } from 'src/typings'
import { walletSnippet } from 'src/utils/helpers'

import { easAbi } from './easAbi'

const propDateValidationSchema = Yup.object().shape({
  milestoneId: Yup.number(),
  proposalId: Yup.string()
    .required('Proposal ID (bytes32) is required')
    .matches(
      /^0x[a-fA-F0-9]{64}$/,
      'Proposal ID must be a valid bytes32 hex string (e.g., 0x...)'
    ),
  replyTo: Yup.string(),
  message: Yup.string().required('Message is required'),
})

interface PropDateFormValues {
  milestoneId: number
  proposalId: string
  replyTo: string
  message: string
}

const getErrorMessage = (error: unknown): string => {
  if (!error) return 'An unknown error occurred.'
  if (typeof error === 'string') return error
  if (typeof error === 'object' && error !== null) {
    // Type assertion with Record to handle potential properties
    const errorObj = error as Record<string, unknown>
    if ('shortMessage' in errorObj && typeof errorObj.shortMessage === 'string') {
      return errorObj.shortMessage
    }
    if ('message' in errorObj && typeof errorObj.message === 'string') {
      return errorObj.message
    }
  }
  return 'An unknown error occurred.'
}

export const PropDateForm = ({
  closeForm,
  onSuccess,
  proposalId,
  replyTo,
  invoiceData,
}: {
  closeForm: () => void
  onSuccess: () => void
  proposalId: string
  replyTo?: PropDate
  invoiceData?: InvoiceMetadata
}) => {
  const initialValues = useMemo(
    () =>
      ({
        milestoneId: -1,
        proposalId: proposalId,
        replyTo: replyTo?.txid ?? zeroHash,
        message: '',
      }) as PropDateFormValues,
    [proposalId, replyTo?.txid]
  )

  return (
    <Box
      p="x6"
      borderColor="border"
      borderStyle="solid"
      borderRadius="curved"
      borderWidth="normal"
      backgroundColor="background1"
      mb="x6"
    >
      <Flex justify="space-between" mb="x4" align="center">
        <Text fontSize={20} fontWeight="label">
          Create Propdate
        </Text>
      </Flex>

      <Formik<PropDateFormValues>
        initialValues={initialValues}
        validationSchema={propDateValidationSchema}
        onSubmit={() => {}}
        validateOnMount={true}
      >
        {(formik) => (
          <PropDateFormInner
            closeForm={closeForm}
            onSuccess={onSuccess}
            replyTo={replyTo}
            formik={formik}
            invoiceData={invoiceData}
          />
        )}
      </Formik>
    </Box>
  )
}

const ReplyTo = ({
  replyTo,
  ensName,
  ensAvatar,
}: {
  replyTo: PropDate
  ensName?: string | null
  ensAvatar?: string | null
}) => {
  return (
    <Flex
      direction="column"
      backgroundColor="neutralActive"
      px="x3"
      py="x2"
      borderRadius="curved"
      mt="x2"
      style={{
        borderLeft: 'var(--space-x2) solid var(--colors-text4)',
      }}
      gap="x1"
    >
      <Flex align="center" gap="x1">
        <Avatar address={replyTo.attester} src={ensAvatar || undefined} size="16" />
        <Text variant={'label-sm'} fontWeight="label">
          {ensName || walletSnippet(replyTo.attester)}
        </Text>
      </Flex>
      <Text
        variant="paragraph-sm"
        color="text2"
        style={{
          wordBreak: 'break-word',
          paddingLeft: 'var(--space-x1)',
        }}
      >
        {replyTo.message}
      </Text>
    </Flex>
  )
}

type AttestationParams = {
  schema: Hex
  data: {
    recipient: Hex
    expirationTime: bigint
    revocable: boolean
    refUID: Hex
    data: Hex
    value: bigint
  }
}

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

const schemaEncoder = new SchemaEncoder(PROPDATE_SCHEMA)

// PropDateFormInner component
const PropDateFormInner = ({
  closeForm,
  onSuccess,
  replyTo,
  formik,
  invoiceData,
}: {
  closeForm: () => void
  onSuccess: () => void
  replyTo?: PropDate
  formik: FormikProps<PropDateFormValues>
  invoiceData?: InvoiceMetadata
}) => {
  const chainId = useChainId()
  const {
    addresses: { token },
  } = useDaoStore()

  const [txHash, setTxHash] = useState<Hex | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)

  const data = useFormikContext<PropDateFormValues>()
  const currentValues = data?.values

  // Debounce form values to prevent constant recalculation during typing
  const debouncedValues = useDebounce(currentValues, 500)

  // Memoize the encoded data based on debounced form values
  const encodedData = useMemo(() => {
    if (!debouncedValues) return null

    const originalMessageId = debouncedValues.replyTo
      ? (debouncedValues.replyTo as Hex)
      : zeroHash

    const milestoneId = debouncedValues.milestoneId
    let message = debouncedValues.message
    let messageType = MessageType.INLINE_TEXT

    if (Number(milestoneId) >= 0) {
      const messageJSON = {
        milestoneId: Number(milestoneId),
        content: debouncedValues.message,
      }
      message = JSON.stringify(messageJSON)
      messageType = MessageType.INLINE_JSON
    }

    return schemaEncoder.encodeData([
      { name: 'proposalId', value: debouncedValues.proposalId as Hex, type: 'bytes32' },
      { name: 'originalMessageId', value: originalMessageId, type: 'bytes32' },
      { name: 'messageType', value: messageType, type: 'uint8' },
      { name: 'message', value: message, type: 'string' },
    ]) as Hex
  }, [debouncedValues])

  // Pre-calculate attestation parameters when values change (but after debounce)
  const attestParams: AttestationParams | undefined = useMemo(() => {
    if (!encodedData || !token || !isAddress(token)) return undefined

    const params: AttestationParams = {
      schema: PROPDATE_SCHEMA_UID,
      data: {
        recipient: getAddress(token),
        expirationTime: 0n,
        revocable: true,
        refUID: zeroHash,
        data: encodedData,
        value: 0n,
      },
    }

    return params
  }, [encodedData, token])

  const easContractAddress = EAS_CONTRACT_ADDRESS[chainId as CHAIN_ID]

  const {
    config,
    isError,
    isSuccess: isPrepareSuccess,
    error: prepareError,
  } = usePrepareContractWrite({
    enabled: !!attestParams && !!easContractAddress,
    address: easContractAddress,
    abi: easAbi,
    functionName: 'attest',
    chainId: chainId,
    args: [attestParams],
  })

  const {
    writeAsync,
    isLoading: isSigningLoading,
    error: writeError,
  } = useContractWrite(config)

  const {
    isLoading: isWaitingTx,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error: txError,
  } = useWaitForTransaction({
    hash: txHash,
    enabled: !!txHash,
    chainId: chainId,
  })

  const isPending = isSigningLoading || isWaitingTx
  const isLoading = isSubmitting || isPending

  const { ensName: replyToEnsName, ensAvatar: replyToEnsAvatar } = useEnsData(
    replyTo?.attester
  )

  useEffect(() => {
    if (isError && isSubmitting && prepareError) {
      setErrorMessage(getErrorMessage(prepareError))
    }
  }, [isError, isSubmitting, prepareError])

  useEffect(() => {
    const executeWrite = async () => {
      if (isPrepareSuccess && isSubmitting && writeAsync) {
        try {
          const result = await writeAsync?.()
          if (result?.hash) {
            setTxHash(result.hash)
          } else {
            setErrorMessage('Failed to get transaction hash.')
          }
        } catch (err: unknown) {
          console.error('Error submitting propdate (signing):', err)
          const message = getErrorMessage(err)
          setErrorMessage(message)
          setTxHash(undefined)
        }
      }
    }

    executeWrite()
  }, [isPrepareSuccess, isSubmitting, writeAsync])

  useEffect(() => {
    if (isTxError) {
      const message = getErrorMessage(txError)
      setErrorMessage(message)
      setTxHash(undefined)
    }
  }, [isTxSuccess, isTxError, txError])

  // Effect to handle potential signing errors from useContractWrite
  useEffect(() => {
    if (writeError) {
      const message = getErrorMessage(writeError)
      setErrorMessage(message)
      setTxHash(undefined)
    }
  }, [writeError])

  const handleSubmit = async () => {
    setErrorMessage(null)
    setIsSubmitting(true)

    if (!easContractAddress) {
      setErrorMessage('Propdates are not supported on this network.')
      setIsSubmitting(false)
      return
    }

    if (!attestParams || !encodedData) {
      setErrorMessage('Failed to prepare transaction data. Please try again.')
      setIsSubmitting(false)
      return
    }
    setShowStatusModal(true)
  }

  const handleCloseModal = () => {
    setShowStatusModal(false)
    setIsSubmitting(false)
    setTxHash(undefined)
    setErrorMessage(null) // Clear error on modal close
    if (isTxSuccess) {
      // Only close the main form if the transaction was successful
      onSuccess()
    }
  }

  return (
    <>
      <Form>
        <Flex direction={'column'} w={'100%'} py="x2" pl="x2">
          {replyTo && (
            <Box pb="x8">
              <Text variant="label-md" mb="x1">
                Replying to:
              </Text>
              <ReplyTo
                replyTo={replyTo}
                ensName={replyToEnsName}
                ensAvatar={replyToEnsAvatar}
              />
            </Box>
          )}

          {!replyTo && !!invoiceData?.milestones && (
            <Flex direction={'column'} pb="x8">
              <label className={defaultInputLabelStyle}>Milestone (optional)</label>
              <Select
                {...formik.getFieldProps(`milestoneId`)}
                id="milestoneId"
                defaultValue="-1"
              >
                <option key="not-specific-milestone" value={-1}>
                  No specific milestone
                </option>
                {invoiceData.milestones.map((milestone, i) => (
                  <option key={milestone.title} value={i}>
                    {milestone.title}
                  </option>
                ))}
              </Select>
            </Flex>
          )}

          <SmartInput
            {...formik.getFieldProps('message')}
            type={'textarea'}
            inputLabel={'Message'}
            formik={formik}
            id={'message'}
            helperText={'Your propdate message'}
            errorMessage={
              formik.touched.message && formik.errors.message
                ? formik.errors.message
                : undefined
            }
            placeholder={'Enter your message here...'}
            disabled={isLoading}
          />

          {errorMessage && !showStatusModal && (
            <Text color="negative" mt="x2">
              {errorMessage}
            </Text>
          )}

          <Flex justify="flex-end" mt="x2" gap="x2">
            <Button variant="ghost" onClick={closeForm} disabled={isLoading}>
              Reset
            </Button>
            <Button
              variant="primary"
              type={'submit'}
              onClick={handleSubmit}
              disabled={!formik.isValid || isLoading || !easContractAddress}
              loading={isSubmitting && !showStatusModal}
            >
              Submit Propdate
            </Button>
          </Flex>
          {!easContractAddress && (
            <Text color="negative" mt="x2">
              Propdates are not supported on this network.
            </Text>
          )}
        </Flex>
      </Form>

      {/* Transaction Status Modal */}
      <AnimatedModal open={showStatusModal} close={handleCloseModal}>
        <SuccessModalContent
          success={isTxSuccess}
          pending={isPending && !isTxError && !errorMessage && !writeError}
          title={
            isTxSuccess
              ? 'Propdate Submitted'
              : errorMessage || isTxError || writeError
                ? 'Transaction Failed'
                : 'Submitting Propdate...'
          }
          subtitle={
            isTxSuccess
              ? 'Your propdate has been successfully submitted.'
              : errorMessage || isTxError || writeError
                ? (errorMessage ?? 'An unknown error occurred.')
                : 'Please confirm the transaction in your wallet and wait for confirmation.'
          }
          actions={
            (isTxSuccess || errorMessage || isTxError || writeError) && (
              <Button variant="primary" onClick={handleCloseModal}>
                Close
              </Button>
            )
          }
        />
      </AnimatedModal>
    </>
  )
}
