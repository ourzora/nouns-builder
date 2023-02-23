import React, { useState } from 'react'
import { Button, Heading, Flex, Stack, Text } from '@zoralabs/zord'
import { useFormStore } from 'src/stores'
import { PUBLIC_NOUNS_ADDRESS, PUBLIC_BUILDER_ADDRESS } from 'src/constants/addresses'
import { useEnsData } from 'src/hooks/useEnsData'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { getEnsAddress } from 'src/utils/ens'
import { Contribution } from './Contribution'
import { DaoCopyAddress } from './DaoCopyAddress'
import { ContributionAllocationFormValues, ContributionForm } from './ContributionForm'

const ContributionAllocation = () => {
  const [open, setOpen] = useState(false)
  const contributionAllocation = useFormStore((state) => state.contributionAllocation)
  const setContributionAllocation = useFormStore(
    (state) => state.setContributionAllocation
  )

  const { displayName: builderDisplayName } = useEnsData(PUBLIC_BUILDER_ADDRESS)
  const { displayName: nounsDisplayName } = useEnsData(PUBLIC_NOUNS_ADDRESS)

  const builderAllocationValue = contributionAllocation[0]
  const nounsAllocationValue = contributionAllocation[1] ?? undefined

  const handleSubmit = async ({
    contributionAllocation,
  }: ContributionAllocationFormValues) => {
    const contributionAllocationPromises = contributionAllocation.map((allocation) =>
      getEnsAddress(allocation.founderAddress)
    )

    const contributionAllocationAddresses = await Promise.all(
      contributionAllocationPromises
    )

    setContributionAllocation(
      contributionAllocation.map((allocation, idx) => ({
        ...allocation,
        founderAddress: contributionAllocationAddresses[idx],
      }))
    )
    setOpen(false)
  }

  return (
    <>
      <Stack>
        <Heading size="xs" mt={'x8'} mb={'x6'}>
          Contributions
        </Heading>

        <Flex
          direction={'column'}
          pt={'x4'}
          px={'x6'}
          borderWidth={'normal'}
          borderStyle={'solid'}
          borderColor={'border'}
          borderRadius={'curved'}
        >
          <Flex direction={'row'}>
            <Text fontWeight={'display'} style={{ width: '50%' }}>
              Address
            </Text>
            <Text fontWeight={'display'} style={{ width: '25%' }}>
              Percentage
            </Text>
            <Text fontWeight={'display'} style={{ width: '25%' }}>
              Date
            </Text>
          </Flex>

          <Contribution
            allocation={builderAllocationValue?.allocation}
            endDate={builderAllocationValue?.endDate}
            address={
              <DaoCopyAddress
                name="Builder"
                image="/builder-avatar-circle.png"
                ens={builderDisplayName}
                address={PUBLIC_BUILDER_ADDRESS}
              />
            }
          />

          {nounsAllocationValue && (
            <Contribution
              allocation={nounsAllocationValue?.allocation}
              endDate={nounsAllocationValue?.endDate}
              address={
                <DaoCopyAddress
                  name="Nouns"
                  image="/nouns-avatar-circle.png"
                  ens={nounsDisplayName}
                  address={PUBLIC_NOUNS_ADDRESS}
                />
              }
            />
          )}
        </Flex>

        <Flex align={'center'} justify={'center'}>
          <Button
            borderRadius={'curved'}
            mt={'x4'}
            type="button"
            variant="ghost"
            onClick={() => setOpen(true)}
          >
            Change Contributions
          </Button>
        </Flex>
      </Stack>

      <AnimatedModal open={open} size={'auto'} close={() => setOpen(false)}>
        <ContributionForm handleSubmit={handleSubmit} />
      </AnimatedModal>
    </>
  )
}

export default ContributionAllocation
