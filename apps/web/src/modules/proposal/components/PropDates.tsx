// PropDates displays updates on proposals
import { Box, Button, Flex, Grid, Text } from "@zoralabs/zord"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import { Avatar } from "src/components/Avatar"
import { Icon } from 'src/components/Icon'
import type { PropDate } from "src/data/contract/requests/getPropDates"
import { type DaoMember, memberSnapshotRequest } from "src/data/subgraph/requests/memberSnapshot"
import { useEnsData } from "src/hooks"
import { useDaoStore } from "src/modules/dao/stores"
import { useLayoutStore } from "src/stores/useLayoutStore"
import { propPageWrapper } from 'src/styles/Proposals.css'
import { walletSnippet } from "src/utils/helpers"
import { checksumAddress, type Hex, zeroHash } from "viem"
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Form, Formik, useFormikContext, FormikProps } from "formik"
import SmartInput from "src/components/Fields/SmartInput"
import * as Yup from "yup";
import { useChainId, usePrepareContractWrite, useContractWrite } from "wagmi"
import { easAbi } from "./easAbi"

const useDaoMembers = (chainId: number, token: string) => {
  const [members, setMembers] = useState<DaoMember[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!token) return;
      const data = await memberSnapshotRequest(chainId, token);
      console.log(data)
      setMembers(data);
    };
    fetchMembers();
  }, [chainId, token]);


  return members.map((member) => checksumAddress(member.address as `0x${string}`));
};

// PropDate form validation schema
const propDateValidationSchema = Yup.object().shape({
  propId: Yup.number().required('Proposal ID is required').integer('Must be an integer').min(0, 'Must be positive'),
  replyTo: Yup.string().optional(),
  response: Yup.string().optional(),
  milestoneId: Yup.number().required('Milestone ID is required').integer('Must be an integer').min(0, 'Must be positive'),
});

// PropDate form interface
interface PropDateFormValues {
  propId: number;
  replyTo: string;
  response: string;
  milestoneId: number;
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
        {replyTo.response}
      </span>
    </Text >

  );
};

///// @notice A struct representing the arguments of the attestation request.
//struct AttestationRequestData {
//    address recipient; // The recipient of the attestation.
//    uint64 expirationTime; // The time when the attestation expires (Unix timestamp).
//    bool revocable; // Whether the attestation is revocable.
//    bytes32 refUID; // The UID of the related attestation.
//    bytes data; // Custom attestation data.
//    uint256 value; // An explicit ETH amount to send to the resolver. This is important to prevent accidental user errors.
//}
//
///// @notice A struct representing the full arguments of the attestation request.
//struct AttestationRequest {
//    bytes32 schema; // The unique identifier of the schema.
//    AttestationRequestData data; // The arguments of the attestation request.
//}
//
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

const PropDateFormInner = ({ closeForm, onSuccess, proposalId, propDates, replyTo, daoTreasury, formik }: {
  closeForm: () => void,
  onSuccess?: () => void,
  proposalId: number,
  propDates: PropDate[],
  replyTo?: PropDate,
  daoTreasury: string,
  formik: FormikProps<PropDateFormValues>
}) => {

  const chainId = useChainId()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data = useFormikContext<PropDateFormValues>();

  const currentValues = data?.values;

  const request: AttestationRequest | undefined = useMemo(() => {
    if (!currentValues?.response) return undefined;
    const schemaUID = "0x9ee9a1bfbf4f8f9b977c6b30600d6131d2a56d0be8100e2238a057ea8b18be7e";

    const schemaEncoder = new SchemaEncoder("uint16 propId,string replyTo,string response,uint8 milestoneId");
    const encodedData = schemaEncoder.encodeData([
      { name: "propId", value: proposalId.toString(), type: "uint16" },
      { name: "replyTo", value: replyTo?.txid.toString() ?? "", type: "string" },
      { name: "response", value: currentValues.response.toString(), type: "string" },
      { name: "milestoneId", value: currentValues.milestoneId.toString(), type: "uint8" }
    ]);

    const request: AttestationRequest = {
      schema: schemaUID,
      data: {
        recipient: daoTreasury as Hex,
        expirationTime: 0n,
        revocable: false,
        refUID: zeroHash,
        data: encodedData as Hex,
        value: 0n
      }
    }
    return request
  }, [daoTreasury, proposalId, replyTo, currentValues?.response, currentValues?.milestoneId])

  const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

  const { config, isError } = usePrepareContractWrite({
    enabled: !!request,
    address: easContractAddress,
    abi: easAbi,
    functionName: "attest",
    chainId: chainId,
    args: [request],
  });

  const { writeAsync } = useContractWrite(config)

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
          {...formik.getFieldProps('response')}
          type={'textarea'}
          inputLabel={'Response'}
          formik={formik}
          id={'response'}
          helperText={'Your propdate'}
          errorMessage={
            formik.touched.response && formik.errors.response
              ? formik.errors.response
              : undefined
          }
          placeholder={'Enter your propdate here...'}
          disabled={isSubmitting}
        />

        <SmartInput
          {...formik.getFieldProps('milestoneId')}
          type={'number'}
          inputLabel={'Milestone ID'}
          formik={formik}
          id={'milestoneId'}
          helperText={'Which milestone is this update for?'}
          errorMessage={
            formik.touched.milestoneId && formik.errors.milestoneId
              ? formik.errors.milestoneId
              : undefined
          }
          placeholder={'0'}
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
            disabled={!formik.isValid || isSubmitting || isError}
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
const PropDateForm = ({ closeForm, onSuccess, proposalId, propDates, replyTo, daoTreasury }: {
  closeForm: () => void,
  onSuccess?: () => void,
  proposalId: number,
  propDates: PropDate[],
  replyTo?: PropDate,
  daoTreasury: string
}) => {

  const initialValues: PropDateFormValues = {
    propId: Number(proposalId),
    replyTo: replyTo?.txid ?? "",
    response: '',
    milestoneId: 0,
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
            daoTreasury={daoTreasury}
            formik={formik}
          />
        )}
      </Formik>
    </Box>
  );
};




const PropDateCard = ({ propDate, index, replyTo, setReplyingTo, showForm, setShowForm, replyingTo }: { propDate: PropDate, index: number, replyTo: PropDate | undefined, setReplyingTo: (replyTo: PropDate | undefined) => void, showForm: boolean, setShowForm: (showForm: boolean) => void, replyingTo: PropDate | undefined }) => {
  const [open, setOpen] = useState(true)
  const isMobile = useLayoutStore((x) => x.isMobile)
  const { ensName, ensAvatar } = useEnsData(propDate.attester)
  const { ensName: replyToEnsName } = useEnsData(replyTo?.attester)

  return (
    <Grid
      as="button"
      columns={7}
      gap={isMobile ? 'x1' : 'x0'}
      backgroundColor="background1"
      align={'center'}
      mb="x2"
      px={isMobile ? 'x2' : 'x6'}
      py="x6"
      mt="x4"
      color="text1"
      borderStyle="solid"
      borderColor="border"
      borderRadius="curved"
      w="100%"
    >


      <Text
        style={{ width: 'max-content', fontWeight: 600 }}
        className={{
          borderStyle: 'solid',
          borderRadius: 'phat',
          borderWidth: 'thin',
          py: 'x1',
          px: 'x3',
          mr: 'x2',
          color: 'text3',
          borderColor: 'border'
        }}
      >
        Update #{index + 1}
      </Text>


      <Flex align={'center'} style={{ gridColumn: 'span 4 / span 4' }}>
        {
          <Text variant={isMobile ? 'label-sm' : 'label-md'}>
            Milestone {propDate.milestoneId + 1}
          </Text>
        }
      </Flex>

      <Flex
        align={'center'}
        style={{ gridColumn: 'span 2 / span 2', justifyContent: 'end' }}
      >
        <Text>
          {new Date(propDate.timeCreated * 1000).toLocaleDateString()}
        </Text>
      </Flex>

      <AnimatePresence initial={false}>
        {open && propDate.response && (
          <motion.div
            initial={'inital'}
            animate={'animate'}
            exit={'inital'}
            style={{
              gridColumn: isMobile ? 'span 7 / span 7' : '2 / span 6',
            }}
          >
            <Text
              variant={isMobile ? 'paragraph-sm' : 'paragraph-md'}
              borderRadius="curved"
              mt="x4"
              p="x6"
              textAlign={'left'}
              style={{
                fontWeight: 400,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                minWidth: '80%',
                backgroundColor: '#F9F9F9',
              }}
            >
              <Flex align={'center'} style={{ gridColumn: 'span 4 / span 4' }}>
                <Avatar address={propDate.attester} src={ensAvatar} size={'20'} />
                <Text variant={isMobile ? 'label-sm' : 'label-md'} ml="x2">
                  {ensName || walletSnippet(propDate.attester)}
                </Text>
              </Flex>
              <Text variant="paragraph-md" mt="x2">
                {propDate.response}
              </Text>
              {propDate.replyTo && (
                <ReplyDisplay replyTo={propDate} ensName={replyToEnsName as string} />
              )}
            </Text>
            <Flex justify="flex-end" mt="x2" gap="x2">
              <Button variant="outline" size="xs" onClick={() => { setReplyingTo(propDate); setShowForm(replyingTo?.txid === propDate.txid ? !showForm : true) }}>
                Reply
              </Button>
            </Flex>
          </motion.div>
        )}

      </AnimatePresence>

    </Grid>
  )
}

interface PropDatesProps {
  propDates: PropDate[]
  chainId: number
}

export const PropDates = ({ propDates, chainId }: PropDatesProps) => {
  const [showOnlyDaoMembers, setShowOnlyDaoMembers] = useState(false)

  const [replyingTo, setReplyingTo] = useState<PropDate | undefined>(undefined)

  const { addresses: { token, treasury } } = useDaoStore()

  const daoMembers = useDaoMembers(chainId, token!)

  const [showForm, setShowForm] = useState(false)

  const filteredPropDates = showOnlyDaoMembers
    ? propDates.filter(propDate => daoMembers.includes(checksumAddress(propDate.attester as `0x${string}`)))
    : propDates

  return (
    <Flex className={propPageWrapper}>
      <Box w="100%">
        <Flex justify="space-between" mb="x6" align="center">
          <Text fontSize={20} fontWeight="label">
            Propdates
          </Text>

          <Flex align="center" gap="x2">

            <Button variant={!showForm ? "primary" : "destructive"} size="sm" onClick={() => setShowForm(!showForm)}>
              {
                showForm && <Icon id="trash" fill="onAccent" />
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
            showForm && treasury &&
            <PropDateForm
              daoTreasury={treasury}
              closeForm={() => setReplyingTo(undefined)}
              onSuccess={() => setReplyingTo(undefined)}
              proposalId={propDates[0].propId}
              propDates={propDates}
              replyTo={replyingTo}
            />}
          {filteredPropDates.length > 0 ? (
            filteredPropDates.map((propDate, i) => (
              <PropDateCard
                key={propDate.txid}
                propDate={propDate}
                index={i}
                replyTo={propDate.replyTo ? propDates.find(p => p.txid === propDate.replyTo) : undefined}
                replyingTo={replyingTo}
                setReplyingTo={() => setReplyingTo(propDate)}
                showForm={showForm}
                setShowForm={setShowForm}
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
    </Flex>
  )
}
