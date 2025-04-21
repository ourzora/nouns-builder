import { Box, Button, Flex, Paragraph, Spinner, Text } from '@zoralabs/zord'
import { useState } from 'react'
import { useContractRead } from 'wagmi'

import {
  defaultHelperTextStyle,
  defaultInputLabelStyle,
} from 'src/components/Fields/styles.css'
import { auctionAbi } from 'src/data/contract/abis'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { usePrepareMigration } from 'src/modules/create-proposal/hooks/usePrepareMigration'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
import { CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

import { DropdownSelect } from '../../DropdownSelect'

const chainOptions = [{ label: 'Base', value: CHAIN_ID.BASE }]

export interface MigrationDAOFormProps {
  currentTokenId: bigint
  memberMerkleRoot: `0x${string}`
}

export const MigrateDAOForm = () => {
  const { auction: auctionAddress } = useDaoStore((x) => x.addresses)
  const { id: chainId } = useChainStore((x) => x.chain)
  const [migratingToChainId, setMigratingToChainId] = useState<CHAIN_ID>(
    chainOptions[0].value
  )
  const addTransaction = useProposalStore((state) => state.addTransaction)

  const { data: auction } = useContractRead({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'auction',
    chainId,
  })

  const [, , , , , settled] = unpackOptionalArray(auction, 6)

  const { transactions, error } = usePrepareMigration({
    enabled: settled || false,
    migratingToChainId,
  })

  const handleSubmit = () => {
    if (!transactions || !settled) return
    addTransaction({
      type: TransactionType.MIGRATION,
      summary: 'Migrate to L2',
      transactions,
    })
  }

  const handleChainChange = (value: CHAIN_ID) => {
    setMigratingToChainId(value)
  }

  const loading = settled ? !transactions && !error : false

  return (
    <Box w={'100%'}>
      <Text mb="x8" ml="x2" className={defaultHelperTextStyle}>
        This step will deploy a mirror of this DAO on the L2 of your choice, and create a
        snapshot for members to claim their tokens or receive via airdrop.{' '}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://app.charmverse.io/builderdao/l1-%25E2%2586%2592-l2-dao-migration-faq-24933900064389292"
        >
          Learn more
        </a>
      </Text>
      <Box
        data-testid="migration-form-c0"
        as={'fieldset'}
        style={{ outline: 0, border: 0, padding: 0, margin: 0 }}
      >
        <Flex direction={'column'}>
          <label className={defaultInputLabelStyle}>L2 Chain</label>

          <DropdownSelect
            options={chainOptions}
            value={migratingToChainId}
            onChange={handleChainChange}
          />

          {!settled && (
            <Box mb={'x8'}>
              <Paragraph size="md" color="negative">
                Please settle the final auction before migrating.
              </Paragraph>
            </Box>
          )}

          <Button
            mt={'x9'}
            variant={'outline'}
            borderRadius={'curved'}
            type="button"
            disabled={!transactions || !settled}
            onClick={() => handleSubmit()}
          >
            {loading ? (
              <Flex align={'center'}>
                <Box mr="x2">Loading Transaction Data</Box>
                <Spinner size="md" />
              </Flex>
            ) : error ? (
              'Error Loading Data'
            ) : (
              'Add Transaction to Queue'
            )}
          </Button>
          {error && (
            <Box mt="x4" color="negative">
              An unexpected error has occurred please try again
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
