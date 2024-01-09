import { Box, Button, Flex, Spinner, Text } from '@zoralabs/zord'
import { useState } from 'react'

import {
  defaultHelperTextStyle,
  defaultInputLabelStyle,
} from 'src/components/Fields/styles.css'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { usePrepareMigration } from 'src/modules/create-proposal/hooks/usePrepareMigration'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { CHAIN_ID } from 'src/typings'

import { DropdownSelect } from '../../DropdownSelect'

const chainOptions = [{ label: 'BASE_GOERLI', value: CHAIN_ID.BASE_GOERLI }]

export interface MigrationDAOFormProps {
  currentTokenId: bigint
  memberMerkleRoot: `0x${string}`
}

export const MigrateDAOForm = () => {
  const [migratingToChainId, setMigratingToChainId] = useState<CHAIN_ID>(
    CHAIN_ID.BASE_GOERLI
  )
  const addTransaction = useProposalStore((state) => state.addTransaction)

  const { transactions, error } = usePrepareMigration({
    migratingToChainId,
  })

  const handleSubmit = () => {
    if (!transactions) return
    addTransaction({
      type: TransactionType.MIGRATION,
      summary: 'Migrate to L2',
      transactions,
    })
  }

  const handleChainChange = (value: CHAIN_ID) => {
    setMigratingToChainId(value)
  }

  const loading = !transactions && !error

  return (
    <Box w={'100%'}>
      <Text mb="x8" ml="x2" className={defaultHelperTextStyle}>
        This step will deploy a mirror of this DAO on the L2 of your choice, and create a
        snapshot for members to claim their tokens.{' '}
        <a target="_blank" rel="noreferrer noopener" href="">
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

          <Button
            mt={'x9'}
            variant={'outline'}
            borderRadius={'curved'}
            type="button"
            disabled={!transactions}
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
              An unexpected error has occured please try again
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
