import React, {
  useMemo,
  useCallback,
  ChangeEventHandler,
  ReactElement,
  Fragment,
} from 'react'
import { allocationToggle, allocationToggleButtonVariants } from '../styles.css'
import ContributionAllocationFields from './ContributionAllocationFields'
import { Box, Flex, Stack, Text } from '@zoralabs/zord'
import { FormikProps } from 'formik'
import { useFormStore } from 'src/stores'
import { yearsAhead, formatDate } from 'src/utils/helpers'
import shallow from 'zustand/shallow'
import { PUBLIC_NOUNS_ADDRESS, PUBLIC_BUILDER_ADDRESS } from 'src/constants/addresses'
import { toSeconds } from 'src/utils/helpers'
import Image from 'next/image'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import CopyButton from 'src/components/CopyButton/CopyButton'
import { useEnsData } from 'src/hooks/useEnsData'

interface ContributionAllocationFormProps {
  id: string
  value: any
  inputLabel: string | ReactElement
  formik?: FormikProps<any>
  errorMessage?: any
  autoSubmit?: boolean
  helperText?: string
  onBlur: ChangeEventHandler
  submitCallback?: (values: any) => void
  onChange: ChangeEventHandler
}

const ContributionAllocationForm: React.FC<ContributionAllocationFormProps> = ({
  id,
  formik,
  autoSubmit,
}) => {
  const {
    contributionAllocation,
    setContributionAllocation,
    builderAllocationOn,
    setBuilderAllocationOn,
    nounsAllocationOn,
    setNounsAllocationOn,
    auctionSettings,
  } = useFormStore(
    (state) => ({
      contributionAllocation: state.contributionAllocation,
      setContributionAllocation: state.setContributionAllocation,
      builderAllocationOn: state.builderAllocationOn,
      setBuilderAllocationOn: state.setBuilderAllocationOn,
      nounsAllocationOn: state.nounsAllocationOn,
      setNounsAllocationOn: state.setNounsAllocationOn,
      auctionSettings: state.auctionSettings,
    }),
    shallow
  )

  const { displayName: builderDisplayName } = useEnsData(PUBLIC_BUILDER_ADDRESS)
  const { displayName: nounsDisplayName } = useEnsData(PUBLIC_NOUNS_ADDRESS)

  const submitCallback = useCallback(
    (values: any) => {
      // addresses of all of the founder allocation objects
      const addresses = formik?.values[id].reduce(
        (acc: string[] = [], cv: { founderAddress: string }) => {
          acc.push(cv.founderAddress)
          return acc
        },
        []
      )

      // checking to see if the incoming values matches an existing value
      const founderExists = addresses.includes(values.founderAddress)

      if (founderExists) {
        const updatedValues = formik?.values[id].map((cv: { founderAddress: string }) => {
          if (cv.founderAddress === values.founderAddress) {
            return values
          }
          return cv
        })
        formik?.setFieldValue(id, updatedValues)
        setContributionAllocation(updatedValues) // update the store
      } else {
        formik?.setFieldValue(id, [...formik?.values[id], values])
        setContributionAllocation([...formik?.values[id], values]) // update the store
      }

      if (autoSubmit) {
        formik?.submitForm()
      }

      return
    },
    [autoSubmit, formik, id, setContributionAllocation]
  )

  // part of hardcode fix
  const calculateMaxAllocation = useCallback(
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

  const builderValue = useMemo(() => {
    // finding builderAllocation in contributionAllocation (zustand store) by address
    const builderAllocation = contributionAllocation.find(
      (cv: { founderAddress: string }) => cv.founderAddress === PUBLIC_BUILDER_ADDRESS
    )

    // if it exists but maxAllocation is empty,
    // calculate the maxAllocation and return the object with the maxAllocation appended
    if (builderAllocation && !builderAllocation.maxAllocation) {
      return {
        ...builderAllocation,
        maxAllocation: calculateMaxAllocation(1, yearsAhead(5)),
      }
    }

    if (builderAllocation && builderAllocation.maxAllocation) {
      return builderAllocation
    }

    // if it doesn't exist, return the default value
    return {
      founderAddress: PUBLIC_BUILDER_ADDRESS,
      allocation: 1,
      endDate: yearsAhead(5),
      maxAllocation: calculateMaxAllocation(1, yearsAhead(5)),
    }
  }, [contributionAllocation, calculateMaxAllocation])

  const nounsValue = useMemo(() => {
    // finding nounsAllocation in contributionAllocation (zustand store) by address
    const nounsAllocation = contributionAllocation.find(
      (cv: { founderAddress: string }) => cv.founderAddress === PUBLIC_NOUNS_ADDRESS
    )

    // if it exists but maxAllocation is empty,
    // calculate the maxAllocation and return the object with the maxAllocation appended
    if (nounsAllocation && !nounsAllocation.maxAllocation) {
      return {
        ...nounsAllocation,
        maxAllocation: calculateMaxAllocation(1, yearsAhead(5)),
      }
    }

    if (nounsAllocation && nounsAllocation.maxAllocation) {
      return nounsAllocation
    }

    // if it doesn't exist, return the default value
    return {
      founderAddress: PUBLIC_NOUNS_ADDRESS,
      allocation: 1,
      endDate: yearsAhead(5),
      maxAllocation: calculateMaxAllocation(1, yearsAhead(5)),
    }
  }, [contributionAllocation, calculateMaxAllocation])

  // refactor to one callback for both toggles
  const handleToggleBuilderContribution = useCallback(() => {
    if (builderAllocationOn) {
      const updatedValues = formik?.values[id].filter(
        (v: { founderAddress: string }) => v.founderAddress !== PUBLIC_BUILDER_ADDRESS
      )
      formik?.setFieldValue(id, updatedValues)
      setBuilderAllocationOn(!builderAllocationOn)
    } else {
      formik?.setFieldValue(id, [...formik?.values[id], builderValue])
      setBuilderAllocationOn(!builderAllocationOn)
    }
  }, [builderAllocationOn, formik, id, setBuilderAllocationOn, builderValue])

  const handleToggleNounsContribution = useCallback(() => {
    if (nounsAllocationOn) {
      const updatedValues = formik?.values[id].filter(
        (cv: { founderAddress: string }) => cv.founderAddress !== PUBLIC_NOUNS_ADDRESS
      )
      formik?.setFieldValue(id, updatedValues)
      setNounsAllocationOn(!nounsAllocationOn)
    } else {
      formik?.setFieldValue(id, [...formik?.values[id], nounsValue])
      setNounsAllocationOn(!nounsAllocationOn)
    }
  }, [nounsAllocationOn, formik, id, setNounsAllocationOn, nounsValue])

  return (
    <Stack>
      <Flex direction={'column'}>
        <Text fontSize={20} my={'x4'} fontWeight={'heading'}>
          Contributions
        </Text>
      </Flex>
      <Flex
        direction={'column'}
        pt={'x4'}
        px={'x6'}
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

        {builderAllocationOn ? (
          <Flex direction={'row'} py={'x4'}>
            <Flex gap={'x3'} style={{ width: '50%' }}>
              <Image
                src={'/builder-avatar-circle.png'}
                alt=""
                height={52}
                width={52}
                style={{ borderRadius: '50%' }}
              />
              <Flex direction={'column'} h={'100%'} justify={'space-around'}>
                <Text fontWeight={'display'}>Builder</Text>
                <Flex direction={'row'} align={'center'}>
                  <Text>{builderDisplayName}</Text>
                  <CopyButton text={PUBLIC_BUILDER_ADDRESS} />
                </Flex>
              </Flex>
            </Flex>
            <Flex align={'center'} style={{ width: '25%' }}>
              <Text>{builderAllocationOn ? builderValue?.allocation : '0'}%</Text>
            </Flex>
            <Flex align={'center'} style={{ width: '25%' }}>
              <Text>{formatDate(builderValue?.endDate as string, true)}</Text>
            </Flex>
          </Flex>
        ) : (
          <Fragment />
        )}

        {nounsAllocationOn ? (
          <Flex direction={'row'} py={'x4'}>
            <Flex gap={'x3'} style={{ width: '50%' }}>
              <Image
                src={'/nouns-avatar-circle.png'}
                alt=""
                height={52}
                width={52}
                style={{ borderRadius: '50%' }}
              />
              <Flex direction={'column'} h={'100%'} justify={'space-around'}>
                <Text fontWeight={'display'}>Nouns</Text>
                <Flex direction={'row'} align={'center'}>
                  <Text>{nounsDisplayName}</Text>{' '}
                  <CopyButton text={PUBLIC_NOUNS_ADDRESS} />
                </Flex>
              </Flex>
            </Flex>
            <Flex align={'center'} style={{ width: '25%' }}>
              <Text>{nounsAllocationOn ? nounsValue?.allocation : '0'}%</Text>
            </Flex>
            <Flex align={'center'} style={{ width: '25%' }}>
              <Text>{formatDate(nounsValue?.endDate as string, true)}</Text>
            </Flex>
          </Flex>
        ) : (
          <Fragment />
        )}

        {!builderAllocationOn && !nounsAllocationOn ? (
          <Flex direction={'row'} w={'100%'} py={'x8'} justify={'center'}>
            <Text color={'text3'}>No Contributions</Text>
          </Flex>
        ) : (
          <Fragment />
        )}
      </Flex>
      {/* CHANGE CONTRIBUTIONS MODAL */}
      <AnimatedModal
        trigger={
          <Text w={'100%'} mt={'x4'} mb={'x8'} fontWeight={'display'} align={'center'}>
            {!builderAllocationOn && !nounsAllocationOn
              ? 'Add Contributions'
              : 'Change Contributions'}
          </Text>
        }
        size={'auto'}
        close={() => {
          setContributionAllocation(formik?.values[id])
        }}
      >
        <Stack>
          <Text fontSize={28} fontWeight={'display'} mb={'x4'}>
            Change Contributions
          </Text>
          <Flex direction={'row'} justify={'space-between'} align={'flex-end'} mb={'x3'}>
            <Flex direction={'column'}>
              <Text mt={'x3'} fontWeight={'display'}>
                Builder Contribution
              </Text>
            </Flex>
            <Flex
              className={allocationToggle[builderAllocationOn ? 'on' : 'off']}
              onClick={() => handleToggleBuilderContribution()}
            >
              <Flex
                h={'x6'}
                w={'x6'}
                borderRadius={'round'}
                className={
                  allocationToggleButtonVariants[builderAllocationOn ? 'on' : 'off']
                }
                align={'center'}
                justify={'center'}
              >
                <img src={'/handlebar.png'} alt="toggle-button" />
              </Flex>
            </Flex>
          </Flex>
          {builderAllocationOn ? (
            <ContributionAllocationFields
              value={builderValue}
              submitCallback={submitCallback}
              disableAddress={true}
              disableAll={false}
              defaultAddress={PUBLIC_BUILDER_ADDRESS}
              defaultAllocation={1}
              defaultDate={yearsAhead(5)}
              addressFieldName={'Address'}
              founderField={false}
              isBuilder={true}
            />
          ) : (
            <Fragment />
          )}

          <Box
            h={'x0'}
            borderStyle={'solid'}
            borderColor={'border'}
            borderWidth={'thin'}
            my={'x8'}
          />

          <Flex direction={'row'} justify={'space-between'} align={'flex-end'} mb={'x3'}>
            <Flex direction={'column'}>
              <Text mt={'x3'} fontWeight={'display'}>
                Nouns Contribution
              </Text>
            </Flex>
            <Flex
              className={allocationToggle[nounsAllocationOn ? 'on' : 'off']}
              onClick={() => handleToggleNounsContribution()}
            >
              <Flex
                h={'x6'}
                w={'x6'}
                borderRadius={'round'}
                className={
                  allocationToggleButtonVariants[nounsAllocationOn ? 'on' : 'off']
                }
                align={'center'}
                justify={'center'}
              >
                <img src={'/handlebar.png'} alt="toggle-button" />
              </Flex>
            </Flex>
          </Flex>

          {nounsAllocationOn ? (
            <ContributionAllocationFields
              value={nounsValue}
              submitCallback={submitCallback}
              disableAddress={true}
              disableAll={false}
              defaultAddress={PUBLIC_NOUNS_ADDRESS}
              defaultAllocation={1}
              defaultDate={yearsAhead(5)}
              addressFieldName={'Address'}
              founderField={false}
            />
          ) : (
            <Fragment />
          )}
        </Stack>
      </AnimatedModal>
    </Stack>
  )
}

export default ContributionAllocationForm
