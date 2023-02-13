import Form from '../Form'
import { founderAllocationInner, founderAllocationWrapper } from '../styles.css'
import { contributionAllocationFields, validateContributionAllocation } from './fields'
import { Flex, Text } from '@zoralabs/zord'

import React from 'react'
import { useFormStore, useLayoutStore } from 'src/stores'
import { toSeconds } from 'src/utils/helpers'
import Image from 'next/image'
import CopyButton from 'src/components/CopyButton/CopyButton'
import { useEnsData } from 'src/hooks/useEnsData'
import { PUBLIC_NOUNS_ADDRESS, PUBLIC_BUILDER_ADDRESS } from 'src/constants/addresses'

interface ContributionAllocationFieldsProps {
  // single allocation object that is passed from ContributionAllocationForm.tsx
  // will either be nouns or builder
  value?: {
    founderAddress: string
    allocation: number | string
    endDate: string
    maxAllocation: number | string
  }
  submitCallback: (values: any) => void
  disableAddress: boolean
  disableAll: boolean
  defaultAddress: string | null
  defaultAllocation: number | undefined
  defaultDate: string | undefined
  addressFieldName: string
  founderField: boolean
  isBuilder?: boolean
}

const ContributionAllocationFields: React.FC<ContributionAllocationFieldsProps> = ({
  value,
  submitCallback,
  disableAddress = false,
  disableAll,
  defaultAddress,
  defaultAllocation,
  defaultDate,
  addressFieldName,
  isBuilder,
}) => {
  const auctionSettings = useFormStore((state) => state.auctionSettings)
  const provider = useLayoutStore((state) => state.provider)

  const { displayName: builderDisplayName } = useEnsData(PUBLIC_BUILDER_ADDRESS)
  const { displayName: nounsDisplayName } = useEnsData(PUBLIC_NOUNS_ADDRESS)

  /*
    calculate Max Allocation of Tokens based on Auction Duration and End Date
  */
  const calculateMaxAllocation = React.useCallback(
    (freq: string | number, end: string | number) => {
      const auctionDurationInSeconds = toSeconds(auctionSettings?.auctionDuration)
      const endDate = new Date(end).getTime()
      const now = new Date().getTime()
      const diffInSeconds = Math.abs((endDate - now) / 1000)
      const frequency = Number(freq)
      const numberOfAuctionsTilEndDate = diffInSeconds / auctionDurationInSeconds

      return Math.floor(numberOfAuctionsTilEndDate * (frequency / 100))
    },
    [auctionSettings?.auctionDuration]
  )

  const initialValues = React.useMemo(() => {
    const maxAllocation = calculateMaxAllocation(
      defaultAllocation as string | number,
      defaultDate as string
    )
    return {
      founderAddress: value?.founderAddress || defaultAddress || '',
      allocation: value?.allocation || defaultAllocation || '',
      endDate: value?.endDate || defaultDate || '',
      maxAllocation: value?.maxAllocation || maxAllocation || '',
    }
  }, [value, defaultAllocation, defaultAddress, defaultDate, calculateMaxAllocation])

  /*
    handle submit from user editing a contribution field
  */
  const handleSubmitCallback = React.useCallback(
    (values: typeof initialValues) => {
      submitCallback(values)
      let max = calculateMaxAllocation(values.allocation, values.endDate)
      submitCallback({ ...values, maxAllocation: max })
    },
    [submitCallback, calculateMaxAllocation]
  )

  return (
    <Flex direction={'row'} className={founderAllocationWrapper}>
      <Flex style={{ width: '60%' }} alignSelf={'center'}>
        {isBuilder ? (
          <Flex gap={'x3'}>
            <Image
              src={'/builder-avatar-circle.png'}
              alt=""
              height={52}
              width={52}
              style={{ borderRadius: '50%' }}
            />
            <Flex direction={'column'} h={'100%'} justify={'space-around'}>
              <Flex direction={'row'} align={'center'}>
                <Text>{builderDisplayName}</Text>{' '}
                <CopyButton text={PUBLIC_BUILDER_ADDRESS} />
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Flex gap={'x3'}>
            <Image
              src={'/nouns-avatar-circle.png'}
              alt=""
              height={52}
              width={52}
              style={{ borderRadius: '50%' }}
            />
            <Flex direction={'column'} h={'100%'} justify={'space-around'}>
              <Flex direction={'row'} align={'center'}>
                <Text>{nounsDisplayName}</Text> <CopyButton text={PUBLIC_NOUNS_ADDRESS} />
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex style={{ width: '40%', marginBottom: '-24px' }}>
        <Form
          initialValues={initialValues}
          fields={contributionAllocationFields(disableAll)}
          validationSchema={validateContributionAllocation(provider)}
          submitCallback={(values) => handleSubmitCallback(values)}
          isSubForm={true}
          autoSubmit={true}
          innerStyle={founderAllocationInner}
        />
      </Flex>
    </Flex>
  )
}

export default ContributionAllocationFields
