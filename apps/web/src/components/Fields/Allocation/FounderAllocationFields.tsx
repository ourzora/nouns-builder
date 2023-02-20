import Form from '../Form'
import {
  founderAllocationInner,
  founderAllocationMaxTokens,
  founderAllocationWrapper,
  founderExclamationText,
  founderRemoveIcon,
} from '../styles.css'
import { founderAllocationFields, validateFounderAllocation } from './fields'
import { Flex, Stack } from '@zoralabs/zord'
import React from 'react'
import { useFormStore, useLayoutStore } from 'src/stores'
import { toSeconds } from 'src/utils/helpers'
import { PUBLIC_NOUNS_ADDRESS, PUBLIC_BUILDER_ADDRESS } from 'src/constants/addresses'
import { Icon } from 'src/components/Icon'

interface FounderAllocationFieldsProps {
  value: {
    founderAddress: string
    allocation: string
    endDate: string
    maxAllocation: string
  }[]
  index: number
  formCount: number
  setFormCount: (count: number) => void
  submitCallback: (values: any) => void
  disableAddress: boolean
  disableAll?: boolean
  defaultAddress: string | null
  defaultAllocation?: number
  defaultDate?: string
  addressFieldName?: string
  founderField?: boolean
}

const FounderAllocationFields: React.FC<FounderAllocationFieldsProps> = ({
  value,
  index,
  formCount,
  setFormCount,
  submitCallback,
  disableAddress = false,
  disableAll,
  defaultAddress,
  defaultAllocation,
  defaultDate,
  addressFieldName,
  founderField,
}) => {
  const auctionSettings = useFormStore((state) => state.auctionSettings)
  const vetoPower = useFormStore((state) => state.vetoPower)
  const provider = useLayoutStore((state) => state.provider)

  const [isHover, setIsHover] = React.useState<boolean>(false)

  const initialValues = React.useMemo(() => {
    return {
      founderAddress: 'ddddd',
      allocation: value?.[index]?.allocation || defaultAllocation || '',
      endDate: value?.[index]?.endDate || defaultDate || '',
      maxAllocation: value?.[index]?.maxAllocation || '',
    }
  }, [index, value, defaultAllocation, defaultAddress, defaultDate])

  const handleRemove = React.useCallback(() => {
    const v = [...value]
    const f = v.filter((item) => v.indexOf(item) !== index)
    submitCallback(f)
    setFormCount(formCount - 1)
  }, [value, index, submitCallback, setFormCount, formCount])

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

  /*
    handle submit
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
    <Stack
      position={'relative'}
      mb={'x8'}
      className={founderAllocationWrapper}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Form
        initialValues={initialValues}
        fields={founderAllocationFields(disableAddress, disableAll, addressFieldName)}
        // validationSchema={validateFounderAllocation(provider)}
        submitCallback={(values: typeof initialValues) => handleSubmitCallback(values)}
        isSubForm={true}
        autoSubmit={true}
        innerStyle={founderAllocationInner}
        parentValues={value}
      />

      {/* DISPLAYS MAX TOKEN ALLOCATION FOR INDIV ADDR/FIELD */}
      {value?.[index]?.maxAllocation ? (
        <Flex fontSize={12} className={founderAllocationMaxTokens}>
          ~ {value?.[index]?.maxAllocation} Tokens
        </Flex>
      ) : null}

      {/* REMOVE ADDRESS - TRASH ICON */}
      {isHover &&
      founderField && // contribution fields cannot have remove button
      index > 0 ? (
        <Flex
          position={'absolute'}
          bottom={'x0'}
          left={'x0'}
          className={founderRemoveIcon}
          onClick={() => handleRemove()}
        >
          <Icon id="trash" />
        </Flex>
      ) : null}

      {/* alert text for veto power or not */}
      {(value.length === 1 && value?.[0].founderAddress === PUBLIC_NOUNS_ADDRESS && (
        <>
          {index === 1 && vetoPower === 0 ? (
            <Flex align={'center'} className={founderExclamationText}>
              <Icon size="sm" id="warning-16" fill="warning" />
              <Flex ml={'x2'}>This address has proposal veto power</Flex>
            </Flex>
          ) : null}
        </>
      )) ||
        (index === 0 && vetoPower === 0 ? (
          <Flex align={'center'} className={founderExclamationText}>
            <Icon size="sm" id="warning-16" fill="warning" />
            <Flex ml={'x2'}>This address has proposal veto power</Flex>
          </Flex>
        ) : null)}
    </Stack>
  )
}

export default FounderAllocationFields
