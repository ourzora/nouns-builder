import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Box, Button, Flex, Grid, Text } from "@zoralabs/zord";
import { Form, Formik, type FormikProps, useFormikContext } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState, Fragment, useEffect, useMemo, useRef } from "react";
import { Avatar } from "src/components/Avatar";
import SmartInput from "src/components/Fields/SmartInput";
import { Icon } from 'src/components/Icon';
import { ATTESTATION_SCHEMA_UID, type PropDate } from "src/data/contract/requests/getPropDates";
import { type DaoMember, memberSnapshotRequest } from "src/data/subgraph/requests/memberSnapshot";
import { useEnsData } from "src/hooks";
import { useDaoStore } from "src/modules/dao/stores";
import { useLayoutStore } from "src/stores/useLayoutStore";
import { propPageWrapper } from 'src/styles/Proposals.css';
import { walletSnippet } from "src/utils/helpers";
import { type Hex, checksumAddress, zeroHash } from "viem";
import { useChainId, useContractWrite, usePrepareContractWrite, useQuery, useWaitForTransaction } from "wagmi";
import * as Yup from "yup";
import { easAbi } from "./easAbi";
import ErrorBoundary from "src/components/ErrorBoundary";

const useDaoMembers = (chainId: number, token: string) => {
  const { data: members } = useQuery<DaoMember[], Error>(
    ["members", chainId, token],
    () => memberSnapshotRequest(chainId, token),
    {
      enabled: !!token,
    }
  );

  if (!members) {
    return [];
  }

  return members.map((member: DaoMember) => checksumAddress(member.address as `0x${string}`));
};

// PropDate form validation schema
const propDateValidationSchema = Yup.object().shape({
  proposalId: Yup.string()
    .required('Proposal ID (bytes32) is required')
    .matches(/^0x[a-fA-F0-9]{64}$/, 'Proposal ID must be a valid bytes32 hex string (e.g., 0x...)'),
  replyTo: Yup.string().optional(),
  message: Yup.string().required('Message is required'),
});

// PropDate form interface
interface PropDateFormValues {
  proposalId: string;
  replyTo: string;
  message: string;
}

// Create a reusable component for displaying replies
const ReplyDisplay = ({ replyTo, ensName }: {
  replyTo?: PropDate,
  ensName?: string
}) => {
  if (!replyTo) return null;

  return (
    <Text
      variant="paragraph-sm"
      color="text2"
      backgroundColor="background2"
      px="x2"
      py="x1"
      borderRadius="curved"
      mt="x2"
    >
      <span style={{ fontWeight: 'bold' }}>
        {ensName ? `${ensName} said:` : `${walletSnippet(replyTo.attester)} said:
        `}
      </span>
      <span>
        {replyTo.message}
      </span>
    </Text >

  );
};

type AttestationRequest = {
  schema: Hex,
  data: {
    recipient: Hex,
    expirationTime: bigint,
    revocable: boolean,
    refUID: Hex,
    data: Hex,
    value: bigint
  }
}

// Define a type for the attestation parameters that matches the EAS contract expectations
type AttestationParams = {
  schema: Hex,
  data: {
    recipient: Hex,
    expirationTime: string,
    revocable: boolean,
    refUID: Hex,
    data: Hex,
    value: string
  }
};

// Debounce utility function
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const PropDateFormInner = ({ closeForm, onSuccess, proposalId, propDates, replyTo, daoToken, formik }: {
  closeForm: () => void,
  onSuccess?: () => void,
  proposalId: string,
  propDates: PropDate[],
  replyTo?: PropDate,
  daoToken: string,
  formik: FormikProps<PropDateFormValues>
}) => {

  const chainId = useChainId()

  const [txHash, setTxHash] = useState<Hex | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [attestParams, setAttestParams] = useState<AttestationParams | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = useFormikContext<PropDateFormValues>();
  const currentValues = data?.values;

  // Debounce form values to prevent constant recalculation during typing
  const debouncedValues = useDebounce(currentValues, 500);

  const easContractAddress = "0x4200000000000000000000000000000000000021";

  // Memoize the schema encoder to avoid recreating it on every render
  const schemaEncoder = useMemo(() =>
    new SchemaEncoder("bytes32 proposalId, bytes32 originalMessageId, uint8 messageType, string message"),
    []
  );

  // Memoize the encoded data based on debounced form values
  const encodedData = useMemo(() => {
    if (!debouncedValues) return null;

    const originalMessageId = debouncedValues.replyTo ? (debouncedValues.replyTo as Hex) : zeroHash;

    return schemaEncoder.encodeData([
      { name: "proposalId", value: debouncedValues.proposalId as Hex, type: "bytes32" },
      { name: "originalMessageId", value: originalMessageId, type: "bytes32" },
      { name: "messageType", value: "0", type: "uint8" },
      { name: "message", value: debouncedValues.message, type: "string" }
    ]) as Hex;
  }, [schemaEncoder, debouncedValues]);

  // Pre-calculate attestation parameters when values change (but after debounce)
  useEffect(() => {
    if (!debouncedValues || !encodedData || isSubmitting) return;

    try {
      const schemaUID = checksumAddress(ATTESTATION_SCHEMA_UID as `0x${string}`);

      const params: AttestationParams = {
        schema: schemaUID,
        data: {
          recipient: daoToken as `0x${string}`,
          expirationTime: "0",
          revocable: true,
          refUID: zeroHash,
          data: encodedData,
          value: "0"
        }
      };

      setAttestParams(params);
    } catch (err) {
      console.error("Error pre-calculating attestation params:", err);
      // Don't set error state here to avoid UI disruption during typing
    }
  }, [debouncedValues, encodedData, daoToken, isSubmitting]);

  const { config, isError, isSuccess: isPrepareSuccess, error: prepareError } = usePrepareContractWrite({
    enabled: !!attestParams,
    address: easContractAddress,
    abi: easAbi,
    functionName: "attest",
    chainId: chainId,
    args: [attestParams], // Pass as a single parameter
  });

  const { writeAsync, isLoading: isSigningLoading, error: writeError } = useContractWrite(config)

  console.log({ writeError })
  // Hook to wait for transaction confirmation
  const {
    data: txReceipt,
    isLoading: isWaitingTx,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error: txError
  } = useWaitForTransaction({
    hash: txHash,
    enabled: !!txHash,
    chainId: chainId,
  });

  // Combined loading state
  const isLoading = isSubmitting || isSigningLoading || isWaitingTx;

  console.log({ config, isError })

  const { ensName: replyToEnsName } = useEnsData(replyTo?.attester);

  // Effect to handle prepare contract write errors
  useEffect(() => {
    if (isError && isSubmitting && prepareError) {
      let message = "Failed to prepare transaction.";
      if (prepareError && typeof prepareError === 'object' && 'shortMessage' in prepareError) {
        message = String(prepareError.shortMessage);
      } else if (prepareError instanceof Error) {
        message = prepareError.message;
      }
      setError(message);
      setAttestParams(undefined);
      setIsSubmitting(false);
    }
  }, [isError, isSubmitting, prepareError]);

  // Effect to execute write when prepare succeeds
  useEffect(() => {
    const executeWrite = async () => {
      if (isPrepareSuccess && isSubmitting && writeAsync) {
        try {
          const result = await writeAsync();
          if (result?.hash) {
            setTxHash(result.hash);
          } else {
            setError("Failed to get transaction hash.");
          }
        } catch (err: unknown) {
          console.error("Error submitting propdate (signing):", err);
          let message = "Failed to submit transaction.";
          if (err && typeof err === 'object' && 'shortMessage' in err) {
            message = String(err.shortMessage);
          } else if (err instanceof Error) {
            message = err.message;
          }
          setError(message);
          setTxHash(undefined);
          setIsSubmitting(false);
        }
      }
    };

    executeWrite();
  }, [isPrepareSuccess, isSubmitting, writeAsync]);

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    // We now use the pre-calculated attestation parameters
    if (!attestParams || !encodedData) {
      setError("Failed to prepare transaction data. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // The attestParams are already set up from the useEffect
    console.log({ attestParams });
  };

  // Effect to handle transaction success or failure
  useEffect(() => {
    if (isTxSuccess) {
      console.log("Transaction successful:", txReceipt);
      if (onSuccess) onSuccess();
      closeForm();
      setTxHash(undefined);
      setError(null);
      setAttestParams(undefined); // Reset params on success
      setIsSubmitting(false);
    }
    if (isTxError) {
      console.error("Transaction failed:", txError);
      let message = "Transaction failed.";
      if (txError && typeof txError === 'object' && 'shortMessage' in txError) {
        message = String(txError.shortMessage);
      } else if (txError instanceof Error) {
        message = txError.message;
      }
      setError(message);
      setTxHash(undefined);
      setAttestParams(undefined); // Reset params on error
      setIsSubmitting(false);
    }
  }, [isTxSuccess, isTxError, txReceipt, txError, onSuccess, closeForm]);

  // Effect to handle potential signing errors from useContractWrite
  useEffect(() => {
    if (writeError) {
      let message = "Failed to initiate transaction.";
      if (writeError && typeof writeError === 'object' && 'shortMessage' in writeError) {
        message = String(writeError.shortMessage);
      } else if (writeError instanceof Error) {
        message = writeError.message;
      }
      setError(message);
      setTxHash(undefined);
      setAttestParams(undefined); // Reset params on error
      setIsSubmitting(false);
    }
  }, [writeError]);


  return (
    <Form>
      <Flex direction={'column'} w={'100%'} gap="x4">
        {replyTo && (
          <Box mb="x2">
            <Text variant="label-md" mb="x1">Replying to:</Text>
            <ReplyDisplay replyTo={replyTo} ensName={replyToEnsName as string} />
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

        {error && (
          <Text color="negative" mt="x2">
            {error}
          </Text>
        )}

        <Flex justify="flex-end" mt="x2" gap="x2">
          <Button variant="ghost" onClick={closeForm}>
            Reset
          </Button>
          <Button
            variant="primary"
            type={'submit'}
            onClick={handleSubmit}
            disabled={!formik.isValid || isLoading}
            loading={isLoading}
          >
            Submit Propdate
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};


// PropDate form component
const PropDateForm = ({ closeForm, onSuccess, proposalId, propDates, replyTo, daoToken }: {
  closeForm: () => void,
  onSuccess?: () => void,
  proposalId: string,
  propDates: PropDate[],
  replyTo?: PropDate,
  daoToken: string
}) => {

  const initialValues = useMemo(() => ({
    proposalId: proposalId,
    replyTo: replyTo?.txid ?? zeroHash,
    message: '',
  } as PropDateFormValues), [proposalId, replyTo?.txid]);


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
        <Text fontSize={18} fontWeight="label">Create Propdate</Text>
      </Flex>

      <Formik<PropDateFormValues>
        initialValues={initialValues}
        validationSchema={propDateValidationSchema}
        onSubmit={() => { }}
        validateOnMount={true}
      >
        {(formik) => (
          <PropDateFormInner
            closeForm={closeForm}
            onSuccess={onSuccess}
            proposalId={proposalId}
            propDates={propDates}
            replyTo={replyTo}
            daoToken={daoToken}
            formik={formik}
          />
        )}
      </Formik>
    </Box>
  );
};




const PropDateCard = ({ propDate, index, originalMessage, setReplyingTo, isReplying, onReplyClick }: {
  propDate: PropDate,
  index: number,
  originalMessage: PropDate | undefined,
  setReplyingTo: (replyTo: PropDate | undefined) => void,
  isReplying: boolean,
  onReplyClick: (propDate: PropDate) => void
}) => {
  const isMobile = useLayoutStore((x) => x.isMobile)
  const { ensName, ensAvatar } = useEnsData(propDate?.attester)
  const { ensName: originalMessageEnsName } = useEnsData(originalMessage?.attester)

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
          <Avatar address={propDate.attester} src={ensAvatar} size={isMobile ? '24' : '32'} />
          <Text variant={isMobile ? 'label-sm' : 'label-md'} fontWeight="display">
            {ensName || walletSnippet(propDate.attester)}
          </Text>
          <Text variant="label-sm" color="text3">
            • {new Date(propDate.timeCreated * 1000).toLocaleDateString()}
          </Text>
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
        <Box>
          {originalMessage && (
            <Box ml="x2" pl="x2" mb="x2">
              <ReplyDisplay replyTo={originalMessage} ensName={originalMessageEnsName as string} />
            </Box>
          )}
          <Box
            borderRadius="curved"
            p="x4"
            backgroundColor="background2"
          >
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
        </Box>
      )}

      <Flex justify="flex-end">
        <Button variant={isReplying ? "secondary" : "outline"} size="sm" onClick={() => onReplyClick(propDate)}>
          {isReplying ? "Cancel Reply" : "Reply"}
        </Button>
      </Flex>
    </Flex>
  )
}

interface PropDatesProps {
  propDates: PropDate[];
  chainId: number;
  proposalId: string;
}

export const PropDates = ({ propDates, chainId, proposalId }: PropDatesProps) => {
  const [showOnlyDaoMembers, setShowOnlyDaoMembers] = useState(false)

  const [replyingTo, setReplyingTo] = useState<PropDate | undefined>(undefined)

  const { addresses: { token } } = useDaoStore()

  const daoMembers = useDaoMembers(chainId, token ? token : "")

  const [showForm, setShowForm] = useState(false)

  const filteredPropDates = showOnlyDaoMembers
    ? propDates.filter(propDate => daoMembers.includes(checksumAddress(propDate.attester as `0x${string}`)))
    : propDates

  const handleReplyClick = (propDateToReply: PropDate) => {
    if (replyingTo?.txid === propDateToReply.txid) {
      setShowForm(false);
      setReplyingTo(undefined);
    } else {
      setReplyingTo(propDateToReply);
      setShowForm(true);
    }
  };

  return (
    <Flex className={propPageWrapper}>
      <ErrorBoundary fallback={<Text color="negative">Failed to load Propdates.</Text>}>
        <Box w="100%">
          <Flex justify="space-between" mb="x6" align="center">
            <Text fontSize={20} fontWeight="label">
              Propdates
            </Text>

            <Flex align="center" gap="x2">

              <Button variant={!showForm || replyingTo ? "primary" : "destructive"} size="sm" onClick={() => { setShowForm(!showForm); setReplyingTo(undefined); }}>
                {
                  showForm && !replyingTo && <Icon id="cross" fill="onAccent" />
                }
                {
                  showForm ? "Cancel" : "Create Propdate"
                }
              </Button>

              <Button variant="secondary" size="sm" onClick={() => setShowOnlyDaoMembers(!showOnlyDaoMembers)}>
                {
                  showOnlyDaoMembers && <Icon id={
                    "check"
                  } />
                }
                {
                  showOnlyDaoMembers
                    ? "DAO Members Only"
                    : "All Members"
                }
              </Button>
            </Flex>
          </Flex>

          <Box>

            {
              showForm && token &&
              (() => {
                // Explicitly define props object to potentially help type inference
                const formProps = {
                  daoToken: token,
                  closeForm: () => { setShowForm(false); setReplyingTo(undefined); },
                  onSuccess: () => { setShowForm(false); setReplyingTo(undefined); /* TODO: Add optimistic update or refetch */ },
                  proposalId: proposalId,
                  propDates: propDates,
                  replyTo: replyingTo,
                };
                return <PropDateForm {...formProps} />;
              })()
            }
            {filteredPropDates.length > 0 ? (
              filteredPropDates.map((propDate, i) => (
                <PropDateCard
                  key={`${propDate.txid}-${i}`}
                  propDate={propDate}
                  index={i}
                  originalMessage={propDate.originalMessageId && propDate.originalMessageId !== zeroHash
                    ? propDates.find(p => p.txid === propDate.originalMessageId)
                    : undefined}
                  setReplyingTo={setReplyingTo}
                  isReplying={replyingTo?.txid === propDate.txid}
                  onReplyClick={handleReplyClick}
                />
              ))
            ) : (
              <Flex
                justify="center"
                p="x6"
                borderColor="border"
                borderStyle="solid"
                borderRadius="curved"
                borderWidth="normal"
                backgroundColor="background2"
              >
                <Text color="text3">
                  No Updates on this proposal yet!
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
      </ErrorBoundary>
    </Flex>
  )
}
