import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { Form, Formik, type FormikProps, useFormikContext } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { type Hex, getAddress, isAddress, zeroHash } from 'viem'
import {
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useQuery,
  useWaitForTransaction,
} from 'wagmi'
import * as Yup from 'yup'

import { Avatar } from 'src/components/Avatar'
import ErrorBoundary from 'src/components/ErrorBoundary'
import SmartInput from 'src/components/Fields/SmartInput'
import { Icon } from 'src/components/Icon'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import {
  EAS_CONTRACT_ADDRESS,
  PROPDATE_SCHEMA,
  PROPDATE_SCHEMA_UID,
} from 'src/constants/eas'
import { type PropDate } from 'src/data/eas/requests/getPropDates'
import {
  type DaoMember,
  memberSnapshotRequest,
} from 'src/data/subgraph/requests/memberSnapshot'
import { useEnsData } from 'src/hooks'
import { useDaoStore } from 'src/modules/dao/stores'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import { propPageWrapper } from 'src/styles/Proposals.css'
import { CHAIN_ID } from 'src/typings'
import { walletSnippet } from 'src/utils/helpers'

import { easAbi } from './easAbi'

const useDaoMembers = (chainId: number, token: string) => {
  const { data: members } = useQuery<DaoMember[], Error>(
    ['members', chainId, token],
    () => memberSnapshotRequest(chainId, token),
    {
      enabled: !!token,
    }
  )

  if (!members) {
    return []
  }

  return members.map(({ address }) => getAddress(address))
}

const propDateValidationSchema = Yup.object().shape({
  proposalId: Yup.string()
    .required('Proposal ID (bytes32) is required')
    .matches(
      /^0x[a-fA-F0-9]{64}$/,
      'Proposal ID must be a valid bytes32 hex string (e.g., 0x...)'
    ),
  replyTo: Yup.string().optional(),
  message: Yup.string().required('Message is required'),
})

interface PropDateFormValues {
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

const PropDateForm = ({
  closeForm,
  onSuccess,
  proposalId,
  replyTo,
  daoToken,
}: {
  closeForm: () => void
  onSuccess?: () => void
  proposalId: string
  replyTo?: PropDate
  daoToken: string
}) => {
  const initialValues = useMemo(
    () =>
      ({
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
        <Text fontSize={18} fontWeight="label">
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
            daoToken={daoToken}
            formik={formik}
          />
        )}
      </Formik>
    </Box>
  )
}

const ReplyDisplay = ({
  replyTo,
  ensName,
  ensAvatar,
}: {
  replyTo?: PropDate
  ensName?: string
  ensAvatar?: string | null
}) => {
  if (!replyTo) return null

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
  daoToken,
  formik,
}: {
  closeForm: () => void
  onSuccess?: () => void
  replyTo?: PropDate
  daoToken: string
  formik: FormikProps<PropDateFormValues>
}) => {
  const chainId = useChainId()

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

    return schemaEncoder.encodeData([
      { name: 'proposalId', value: debouncedValues.proposalId as Hex, type: 'bytes32' },
      { name: 'originalMessageId', value: originalMessageId, type: 'bytes32' },
      { name: 'messageType', value: '0', type: 'uint8' },
      { name: 'message', value: debouncedValues.message, type: 'string' },
    ]) as Hex
  }, [debouncedValues])

  // Pre-calculate attestation parameters when values change (but after debounce)
  const attestParams: AttestationParams | undefined = useMemo(() => {
    if (!encodedData || !isAddress(daoToken)) return undefined

    const params: AttestationParams = {
      schema: PROPDATE_SCHEMA_UID,
      data: {
        recipient: getAddress(daoToken),
        expirationTime: 0n,
        revocable: true,
        refUID: zeroHash,
        data: encodedData,
        value: 0n,
      },
    }

    return params
  }, [encodedData, daoToken])

  const easContractAddress = EAS_CONTRACT_ADDRESS[chainId as CHAIN_ID]

  const {
    config,
    isError,
    isSuccess: isPrepareSuccess,
    error: prepareError,
  } = usePrepareContractWrite({
    enabled: !!attestParams && !!easContractAddress,
    address: easContractAddress, // Now properly typed as `0x${string}` | undefined
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
    if (isTxSuccess) {
      if (onSuccess) onSuccess()
    }
    if (isTxError) {
      const message = getErrorMessage(txError)
      setErrorMessage(message)
      setTxHash(undefined)
    }
  }, [isTxSuccess, isTxError, txError, onSuccess])

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
      closeForm()
    }
  }

  return (
    <>
      <Form>
        <Flex direction={'column'} w={'100%'} gap="x4">
          {replyTo && (
            <Box mb="x2">
              <Text variant="label-md" mb="x1">
                Replying to:
              </Text>
              <ReplyDisplay
                replyTo={replyTo}
                ensName={replyToEnsName || undefined}
                ensAvatar={replyToEnsAvatar ? replyToEnsAvatar : undefined}
              />
            </Box>
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

const PropDateCard = ({
  propDate,
  index,
  originalMessage,
  isReplying,
  onReplyClick,
  replies = [],
}: {
  propDate: PropDate
  index: number
  originalMessage: PropDate | undefined
  isReplying: boolean
  onReplyClick: (propDate: PropDate) => void
  replies?: PropDate[]
}) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  const { ensName, ensAvatar } = useEnsData(propDate?.attester)

  // Determine if this is a reply to highlight it
  const isReply = !!originalMessage

  return (
    <Flex
      direction="column"
      borderStyle="solid"
      borderWidth="normal"
      borderColor="border"
      borderRadius="curved"
      backgroundColor="background1"
      mb="x2"
      px={isMobile ? 'x2' : 'x6'}
      py="x6"
      mt="x4"
      gap="x4"
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap="x2">
        <Flex align="center" gap="x2">
          <Avatar
            address={propDate.attester}
            src={ensAvatar}
            size={isMobile ? '24' : '32'}
          />
          <Text variant={isMobile ? 'label-sm' : 'label-md'} fontWeight="display">
            {ensName || walletSnippet(propDate.attester)}
          </Text>
          <Text variant="label-sm" color="text3">
            • {new Date(propDate.timeCreated * 1000).toLocaleDateString()}
          </Text>
          {isReply && (
            <Text variant="label-sm" color="accent">
              • Reply
            </Text>
          )}
        </Flex>
        <Box
          borderStyle="solid"
          borderRadius="phat"
          borderWidth="thin"
          py="x1"
          px="x3"
          color="text3"
          borderColor="border"
        >
          <Text variant="label-sm" style={{ fontWeight: 600 }}>
            Update #{index + 1}
          </Text>
        </Box>
      </Flex>

      {propDate.message && (
        <Box borderRadius={'curved'} p={'x4'} backgroundColor={'background2'}>
          <Text
            variant={isMobile ? 'paragraph-sm' : 'paragraph-md'}
            textAlign={'left'}
            style={{
              fontWeight: 400,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {propDate.message}
          </Text>
        </Box>
      )}
      {/* Render replies if any */}
      {replies && replies.length > 0 && (
        <Box mt="x4" ml="x4" style={{ borderLeft: '4px solid var(--colors-border)' }}>
          {replies.map((reply: PropDate) => (
            <Reply key={reply.txid} reply={reply} />
          ))}
        </Box>
      )}
      <Flex justify="flex-end">
        <Button
          variant={isReplying ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onReplyClick(propDate)}
        >
          {isReplying ? 'Cancel Reply' : 'Reply'}
        </Button>
      </Flex>
    </Flex>
  )
}

const Reply = ({ reply }: { reply: PropDate }) => {
  const { ensName, ensAvatar } = useEnsData(reply.attester)
  const isMobile = useLayoutStore((x) => x.isMobile)
  return (
    <Flex key={reply.txid} direction="row" gap="x2" align="flex-start" mb="x3">
      <Avatar address={reply.attester} src={ensAvatar} size={isMobile ? '20' : '28'} />
      <Box
        backgroundColor="background2"
        borderRadius="curved"
        borderColor="border"
        borderWidth="normal"
        borderStyle="solid"
        p="x4"
        style={{ width: 'fit-content', minWidth: 0 }}
      >
        <Flex align="center" gap="x2" mb="x1">
          <Text variant={isMobile ? 'label-sm' : 'label-md'} fontWeight="display">
            {ensName || walletSnippet(reply.attester)}
          </Text>
          <Text variant="label-sm" color="text3">
            • {new Date(reply.timeCreated * 1000).toLocaleDateString()}
          </Text>
        </Flex>
        <Text
          variant={isMobile ? 'paragraph-sm' : 'paragraph-md'}
          textAlign={'left'}
          style={{
            fontWeight: 400,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {reply.message}
        </Text>
      </Box>
    </Flex>
  )
}

interface PropDatesProps {
  propDates: PropDate[]
  chainId: number
  proposalId: string
}

export const PropDates = ({ propDates, chainId, proposalId }: PropDatesProps) => {
  const [showOnlyDaoMembers, setShowOnlyDaoMembers] = useState(false)
  const [replyingTo, setReplyingTo] = useState<PropDate | undefined>(undefined)
  const {
    addresses: { token },
  } = useDaoStore()
  const daoMembers = useDaoMembers(chainId, token ? token : '')
  const [showForm, setShowForm] = useState(false)

  const filteredPropDates = showOnlyDaoMembers
    ? propDates.filter((propDate) => daoMembers.includes(getAddress(propDate.attester)))
    : propDates

  const handleReplyClick = (propDateToReply: PropDate) => {
    if (replyingTo?.txid === propDateToReply.txid) {
      setShowForm(false)
      setReplyingTo(undefined)
    } else {
      setReplyingTo(propDateToReply)
      setShowForm(true)
    }
  }

  const topLevelPropDates = filteredPropDates
    .filter((pd) => !pd.originalMessageId || pd.originalMessageId === zeroHash)
    .sort((a, b) => a.timeCreated - b.timeCreated)

  return (
    <Flex className={propPageWrapper}>
      <ErrorBoundary fallback={<Text color="negative">Failed to load Propdates.</Text>}>
        <Box w="100%">
          <Flex justify="space-between" mb="x6" align="center">
            <Text fontSize={20} fontWeight="label">
              Propdates
            </Text>

            <Flex align="center" gap="x2">
              <Button
                variant={!showForm || replyingTo ? 'primary' : 'destructive'}
                size="sm"
                onClick={() => {
                  setShowForm(!showForm)
                  setReplyingTo(undefined)
                }}
              >
                {showForm && !replyingTo && <Icon id="cross" fill="onAccent" />}
                {showForm ? 'Cancel' : 'Create Propdate'}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowOnlyDaoMembers(!showOnlyDaoMembers)}
              >
                {showOnlyDaoMembers && <Icon id="check" />}
                {showOnlyDaoMembers ? 'DAO Members Only' : 'All Propdates'}
              </Button>
            </Flex>
          </Flex>

          <Box>
            {showForm && token && (
              <PropDateForm
                {...{
                  daoToken: token,
                  closeForm: () => {
                    setShowForm(false)
                    setReplyingTo(undefined)
                  },
                  onSuccess: () => {
                    setShowForm(false)
                    setReplyingTo(undefined) /* TODO: Add optimistic update or refetch */
                  },
                  proposalId: proposalId,
                  propDates: propDates,
                  replyTo: replyingTo,
                }}
              />
            )}
            {topLevelPropDates.map((propDate, i) => {
              const replies = filteredPropDates
                .filter((pd) => pd.originalMessageId === propDate.txid)
                .sort((a, b) => a.timeCreated - b.timeCreated)
              return (
                <PropDateCard
                  key={`${propDate.txid}-${i}`}
                  propDate={propDate}
                  index={i}
                  originalMessage={undefined}
                  isReplying={replyingTo?.txid === propDate.txid}
                  onReplyClick={handleReplyClick}
                  replies={replies}
                />
              )
            })}
            {topLevelPropDates.length === 0 && (
              <Flex
                justify="center"
                p="x6"
                borderColor="border"
                borderStyle="solid"
                borderRadius="curved"
                borderWidth="normal"
                backgroundColor="background2"
              >
                <Text color="text3">No Updates on this proposal yet!</Text>
              </Flex>
            )}
          </Box>
        </Box>
      </ErrorBoundary>
    </Flex>
  )
}
