import React from 'react'
import { UpgradeCard, useAvailableUpgrade } from 'src/modules/transaction-builder'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useProposalStore } from 'src/modules/transaction-builder/stores/useProposalStore'
import { DaoContractAddresses } from 'src/typings'
import dayjs from 'dayjs'
import { Flex, Text } from '@zoralabs/zord'

export const VERSION_PROPOSAL_SUMMARY: { [key: string]: string } = {
  '1.2.0': `<p><img src="https://i.imgur.com/HrQKZMG.png"></p><h2><br></h2><h2>Summary</h2><p>This proposal upgrades the DAO to V1.2 to add several features, improvements and bug fixes.</p><br><h3>Airdrop</h3><p>Ability for DAOs to assign minters and airdrop tokens.</p>`,
  '1.1.0': `<p><img src="https://i.imgur.com/HrQKZMG.png"></p><h2><br></h2><h2>Summary</h2><p>This proposal upgrades the DAO to V1.1 to add the following features, improvements and bug fixes.</p><h3><br></h3><h3>Updatable Founder Shares</h3><p>DAOs will now be able to propose changes to founders shares. This gives DAOs the ability to add, modify and remove founders shares via proposal.</p><p>With this new feature DAO creators will have the ability to modify any errors that may have been caused at DAO deployment.</p><h3><br></h3><h3>Upgrade Visibility</h3><p>In V1.1, each smart contract of a DAO now has an explicit version attached. This means that members and developers will be able easily understand which protocol implementation a DAO is utilizing at any given time.</p><p>This will also make it easier for future upgrades that are in development: including <em>airdrops</em> and <em>custom metadata renderers</em>.</p><h3><br></h3><h3>Proposal Spam Fix</h3><p>Proposal submission to a DAO has an incorrectly implemented check which can allow for spam proposals to be submitted to a DAO. In V1.1 it works as expected.</p><h3><br></h3><h3>Auction Improvements</h3><p>Improved bid handling and edge case management in the Auction House contracts.</p><h3><br></h3><h3>Author</h3><p>This upgrade has been developed and proposed by <strong>Zora</strong> (<a href="https://etherscan.io/address/0xd1d1d4e36117ab794ec5d4c78cbd3a8904e691d0" rel="noopener noreferrer" target="_blank" style="color: rgb(51, 122, 183); background-color: transparent;">zora.eth</a>)</p>`,
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
        <Flex direction={'column'} mt={'x6'}>
          <Text color="text3" mb={'x4'}>
            Upgrade Available
          </Text>
          <UpgradeCard
            onUpgrade={handleUpgrade}
            hasThreshold={hasThreshold}
            version={latest}
            date={date}
            description={description}
            totalContractUpgrades={totalContractUpgrades}
          />
        </Flex>
      </motion.div>
    </AnimatePresence>
  )
}
