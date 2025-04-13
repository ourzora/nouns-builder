import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Box, Button, Flex, Grid, Text } from "@zoralabs/zord";
import { Form, Formik, type FormikProps, useFormikContext } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState, Fragment, useEffect } from "react";
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
import { useChainId, useContractWrite, usePrepareContractWrite, useQuery } from "wagmi";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data = useFormikContext<PropDateFormValues>();

  const currentValues = data?.values;

  // Use useState for the request object
  const [request, setRequest] = useState<AttestationRequest | undefined>(undefined);

  // Use useEffect to calculate and update the request when dependencies change
  useEffect(() => {
    if (!currentValues?.message || typeof currentValues.proposalId === 'undefined') {
      setRequest(undefined); // Reset if conditions aren't met
      return; // Explicitly return void
    }

    const schemaUID = ATTESTATION_SCHEMA_UID;
    const schemaEncoder = new SchemaEncoder("bytes32 proposalId, bytes32 originalMessageId, uint8 messageType, string message");
    const encodedData = schemaEncoder.encodeData([
      { name: "proposalId", value: currentValues.proposalId as Hex, type: "bytes32" },
      { name: "originalMessageId", value: currentValues.replyTo as Hex ?? zeroHash, type: "bytes32" },
      { name: "messageType", value: 0, type: "uint8" },
      { name: "message", value: currentValues.message, type: "string" }
    ]);

    const newRequest: AttestationRequest = {
      schema: schemaUID,
      data: {
        recipient: daoToken as Hex,
        expirationTime: 0n,
        revocable: false,
        refUID: zeroHash,
        data: encodedData as Hex,
        value: 0n
      }
    };
    setRequest(newRequest);


    console.log({ newRequest })

  }, [daoToken, currentValues]);


  console.log({ currentValues })

  const easContractAddress = "0x4200000000000000000000000000000000000021";

  const { config, isError } = usePrepareContractWrite({
    enabled: !!request,
    address: easContractAddress,
    abi: easAbi,
    functionName: "attest",
    chainId: chainId,
    args: [request],
  });

  const { writeAsync } = useContractWrite(config)

  console.log({ config, isError })

  const { ensName: replyToEnsName } = useEnsData(replyTo?.attester);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      await writeAsync?.();

      if (onSuccess) onSuccess();
      closeForm();
    } catch (err) {
      console.error("Error submitting propdate:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };


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
          disabled={isSubmitting}
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
            disabled={!formik.isValid || isSubmitting}
            loading={isSubmitting}
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

  const initialValues: PropDateFormValues = {
    proposalId: proposalId,
    replyTo: replyTo?.txid ?? zeroHash,
    message: '',
  };


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
