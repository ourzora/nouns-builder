import React from 'react'
import { UpgradeCard, useAvailableUpgrade } from 'src/modules/transaction-builder'
import { AnimatePresence, motion } from 'framer-motion'
import { ProposalSection } from 'src/modules/proposals'
import { useRouter } from 'next/router'
import { useProposalStore } from 'src/modules/transaction-builder/stores/useProposalStore'
import { DaoContractAddresses } from 'src/typings'
import dayjs from 'dayjs'
import { v1_1_0 } from './versions/1.1.0'
import { v1_2_0 } from './versions/1.2.0'

export const VERSION_PROPOSAL_SUMMARY: { [key: string]: string } = {
  '1.2.0': v1_2_0,
  '1.1.0': v1_1_0,
}

export const Upgrade = ({
  hasThreshold,
  collection,
  addresses,
}: {
  hasThreshold: boolean
  collection: string
  addresses: DaoContractAddresses
}) => {
  const router = useRouter()
  const createProposal = useProposalStore((state) => state.createProposal)

  const {
    latest,
    date,
    description,
    transaction: upgradeTransaction,
    totalContractUpgrades,
    shouldUpgrade,
  } = useAvailableUpgrade(addresses)

  if (!shouldUpgrade) return null

  const handleUpgrade = (): void => {
    createProposal({
      transactions: [upgradeTransaction!],
      disabled: true,
      title: `Nouns Builder Upgrade v${latest} ${dayjs().format('YYYY-MM-DD')}`,
      summary: VERSION_PROPOSAL_SUMMARY?.[latest as string] || '',
    })

    router.push({
      pathname: '/dao/[token]/proposal/review',
      query: { token: collection },
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={'init'}
        animate={'open'}
        variants={{
          init: {
            height: 0,
            overflow: 'hidden',
            transition: {
              animate: 'easeInOut',
            },
          },
          open: {
            height: 'auto',
            transition: {
              animate: 'easeInOut',
            },
          },
        }}
      >
        <ProposalSection title="Upgrade available">
          <UpgradeCard
            onUpgrade={handleUpgrade}
            hasThreshold={hasThreshold}
            version={latest}
            date={date}
            description={description}
            totalContractUpgrades={totalContractUpgrades}
          />
        </ProposalSection>
      </motion.div>
    </AnimatePresence>
  )
}
