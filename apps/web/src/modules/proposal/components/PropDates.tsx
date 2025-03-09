// PropDates displays updates on proposals
import { Box, Button, Flex, Grid, Text } from "@zoralabs/zord"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Avatar } from "src/components/Avatar"
import { Icon } from 'src/components/Icon'
import { PropDate } from "src/data/contract/requests/getPropDates"
import { DaoMember, memberSnapshotRequest } from "src/data/subgraph/requests/memberSnapshot"
import { useEnsData } from "src/hooks"
import { useDaoStore } from "src/modules/dao/stores"
import { useLayoutStore } from "src/stores/useLayoutStore"
import { propPageWrapper } from 'src/styles/Proposals.css'
import { walletSnippet } from "src/utils/helpers"
import { useAccount } from "wagmi"

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


  return members.map((member) => member.address);
};


const PropDateCard = ({ propDate, index, replyTo }: { propDate: PropDate, index: number, replyTo: PropDate | undefined }) => {
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
                <Text
                  variant="paragraph-sm"
                  color="text2"
                  backgroundColor="background2"
                  px="x2"
                  py="x1"
                  borderRadius="curved"
                  mt="x2"
                >
                  {
                    (replyToEnsName ?? walletSnippet(replyTo?.attester)) + " said: " + replyTo?.response
                  }
                </Text>
              )}
            </Text>
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

  const { address } = useAccount()
  const { addresses: { token } } = useDaoStore()

  const daoMembers = useDaoMembers(chainId, token!)

  const filteredPropDates = showOnlyDaoMembers
    ? propDates.filter(propDate => daoMembers.includes(propDate.attester!))
    : propDates

  return (
    <Flex className={propPageWrapper}>
      <Box w="100%">
        <Flex justify="space-between" mb="x6" align="center">
          <Text fontSize={20} fontWeight="label">
            Propdates
          </Text>

          <Flex align="center" gap="x2" onClick={() => setShowOnlyDaoMembers(!showOnlyDaoMembers)}>
            <Button variant="secondary" size="sm">
              {
                showOnlyDaoMembers && <Icon id={
                  "check"
                } cursor={'pointer'} mr='x0' />}
              {
                showOnlyDaoMembers
                  ? "DAO Members Only"
                  : "All Members"
              }
            </Button>
          </Flex>
        </Flex>

        <Box>
          {filteredPropDates.length > 0 ? (
            filteredPropDates.map((propDate, i) => (
              <PropDateCard
                key={i}
                propDate={propDate}
                index={i}
                replyTo={propDate.replyTo ? propDates.find(p => p.txid === propDate.replyTo) : undefined}
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
