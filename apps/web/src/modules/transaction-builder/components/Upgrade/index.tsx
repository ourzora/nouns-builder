import React from 'react'
import { useDaoStore } from 'src/stores'
import { UpgradeCard, useAvailableUpgrade } from 'src/modules/transaction-builder'
import { AnimatePresence, motion } from 'framer-motion'
import { ProposalSection } from 'src/modules/proposals'

export const Upgrade = ({
  hasThreshold,
  collection,
}: {
  hasThreshold: boolean
  collection: string
}) => {
  const addresses = useDaoStore((state) => state.addresses)

  const {
    latest,
    date,
    title,
    summary,
    description,
    transactions,
    totalContractUpgrades,
    shouldUpgrade,
  } = useAvailableUpgrade(addresses)

  if (!shouldUpgrade) return null

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
            hasThreshold={hasThreshold}
            latest={latest}
            date={date}
            title={title}
            summary={summary}
            description={description}
            upgrades={transactions}
            totalContractUpgrades={totalContractUpgrades}
            collection={collection}
          />
        </ProposalSection>
      </motion.div>
    </AnimatePresence>
  )
}
