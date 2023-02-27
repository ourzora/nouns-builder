import { Box, Flex } from '@zoralabs/zord'
import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { CreateFormSection } from 'src/typings'
import { useAccount } from 'wagmi'

import { useFormStore } from 'src/stores/useFormStore'

import {
  AllocationForm,
  Artwork,
  AuctionSettingsForm,
  CreateNavigation,
  FormHandler,
  GeneralForm,
  ReviewAndDeploy,
  VetoForm,
} from 'src/modules/create-dao'

import Meta from 'src/components/Layout/Meta'

import { createWrapperHalf, formWrapper, pageGrid } from 'src/styles/styles.css'

const Create: NextPage = () => {
  const router = useRouter()
  const { activeSection } = useFormStore()
  const { address } = useAccount()

  useEffect(() => {
    if (!address) {
      router.push('/')
    }
  }, [address, router])

  /*

    Initialize Form Sections
      - order of returned array defines order of sections
      - multiple forms per section supported
  */

  const sections: CreateFormSection[] = React.useMemo(() => {
    const createDao: CreateFormSection = {
      title: 'General',
      heading: 'General Settings',
      forms: [<GeneralForm key={'general-info'} title={''} />],
    }

    const auctionSettings: CreateFormSection = {
      title: 'Auction',
      heading: 'Auction Settings',
      forms: [<AuctionSettingsForm key={'auction-settings'} title={''} />],
    }

    const vetoSettings: CreateFormSection = {
      title: 'Veto',
      heading: ['Veto Power', 'Would you like to include veto power?'],
      subHeading: [
        'Veto power is useful for addressing security concerns in the early days of your DAO, though as your membership grows, consider revisiting this functionality through a decentralized community vote.',
      ],
      forms: [<VetoForm key={'veto-power'} title={''} />],
    }

    const founderAllocations: CreateFormSection = {
      title: 'Allocation',
      heading: 'Allocation',
      forms: [<AllocationForm key={'token-allocations'} title={''} />],
    }

    const setUpArtwork: CreateFormSection = {
      title: 'Artwork',
      heading: ['Artwork Setup', 'Layer Ordering'],
      forms: [<Artwork key={'set-up-artwork'} title={''} />],
    }

    const reviewAndDeploy: CreateFormSection = {
      title: 'Deploy',
      subHeading: '[Confirm your contract settings before deploying your DAO]',
      forms: [<ReviewAndDeploy key={'review-and-deploy'} title={''} />],
    }

    return [
      createDao,
      auctionSettings,
      vetoSettings,
      founderAllocations,
      setUpArtwork,
      reviewAndDeploy,
    ]
  }, [])

  if (!address) {
    return null
  }

  return (
    <>
      <Meta title={'Create a DAO'} slug={'/create'} />

      <Box position="relative" className={pageGrid}>
        <Flex className={createWrapperHalf['left']}>
          <Flex
            position={'absolute'}
            left={'x0'}
            top={'x0'}
            width={'100%'}
            height={'100%'}
            style={{
              background:
                'linear-gradient(179.98deg, rgba(0, 0, 0, 0.5) -0.98%, rgba(0, 0, 0, 0) 47.4%, rgba(0, 0, 0, 0.6) 99.98%)',
            }}
          />
          <CreateNavigation sections={sections} />
        </Flex>
        <Flex
          className={createWrapperHalf['right']}
          p={'x20'}
          placeItems={'center'}
          justify={'center'}
        >
          <Flex direction={'column'} className={formWrapper}>
            <AnimatePresence exitBeforeEnter={true}>
              <motion.div
                key={sections[activeSection]?.title}
                variants={{
                  exit: {
                    y: 10,
                    opacity: 0,
                  },
                  closed: {
                    y: 10,
                    opacity: 0,
                  },
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      when: 'afterChildren',
                    },
                  },
                }}
                initial="closed"
                animate="open"
                exit="exit"
              >
                <FormHandler
                  forms={sections[activeSection]?.forms}
                  title={sections[activeSection]?.title}
                  heading={sections[activeSection]?.heading}
                  subHeading={sections[activeSection]?.subHeading}
                  sections={sections}
                />
              </motion.div>
            </AnimatePresence>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
export default Create
