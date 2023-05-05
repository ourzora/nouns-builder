import { Button, Flex, Stack } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import React, { BaseSyntheticEvent } from 'react'

import DaysHoursMinsSecs from 'src/components/Fields/DaysHoursMinsSecs'
import SmartInput from 'src/components/Fields/SmartInput'
import {
  defaultBackButton,
  defaultFormAdvancedToggle,
  defaultFormAdvancedWrapper,
  defaultFormButtonWithPrev,
} from 'src/components/Fields/styles.css'
import { NUMBER } from 'src/components/Fields/types'
import { Icon } from 'src/components/Icon'
import { isEmpty } from 'src/utils/helpers'

import { useFormStore } from '../../stores'
import {
  AuctionSettingsFormValues,
  auctionSettingsValidationSchema,
} from './AuctionSettingsForm.schema'

interface AuctionSettingsFormProps {
  title: string
}

const animation = {
  init: {
    height: 0,
  },
  open: {
    height: 'auto',
  },
}

export const AuctionSettingsForm: React.FC<AuctionSettingsFormProps> = ({ title }) => {
  const {
    setAuctionSettings,
    auctionSettings,
    setFulfilledSections,
    setActiveSection,
    activeSection,
  } = useFormStore()
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false)

  const initialValues: AuctionSettingsFormValues = {
    auctionDuration: {
      seconds: auctionSettings?.auctionDuration?.seconds,
      minutes: auctionSettings?.auctionDuration?.minutes,
      days: auctionSettings?.auctionDuration?.days,
      hours: auctionSettings?.auctionDuration?.hours,
    },
    auctionReservePrice: auctionSettings?.auctionReservePrice,
    proposalThreshold:
      auctionSettings?.proposalThreshold === 0
        ? 0
        : auctionSettings?.proposalThreshold || 0.5,
    quorumThreshold:
      auctionSettings?.quorumThreshold === 0 ? 0 : auctionSettings?.quorumThreshold || 10,
  }

  const handleSubmit = (values: AuctionSettingsFormValues) => {
    setAuctionSettings(values)
    setFulfilledSections(title)
    setActiveSection(activeSection + 1)
  }

  const handlePrev = () => {
    setActiveSection(activeSection - 1)
  }

  return (
    <Formik<AuctionSettingsFormValues>
      initialValues={initialValues}
      validationSchema={auctionSettingsValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validateOnMount={true}
      validateOnBlur={false}
    >
      {(formik) => (
        <Form>
          <Flex direction={'column'} w={'100%'}>
            <Stack>
              <DaysHoursMinsSecs
                {...formik.getFieldProps('auctionDuration')}
                inputLabel={'Auction Duration'}
                formik={formik}
                id={'auctionDuration'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched['auctionDuration'] && formik.errors['auctionDuration']
                    ? formik.errors['auctionDuration']
                    : undefined
                }
                placeholder={['1', '0', '0', '0']}
              />

              <SmartInput
                {...formik.getFieldProps('auctionReservePrice')}
                inputLabel={'Auction Reserve Price'}
                type={NUMBER}
                formik={formik}
                id={'auctionReservePrice'}
                onChange={({ target }: BaseSyntheticEvent) => {
                  formik.setFieldValue('auctionReservePrice', parseFloat(target.value))
                }}
                onBlur={formik.handleBlur}
                helperText={'The starting price of an auction.'}
                errorMessage={
                  formik.touched['auctionReservePrice'] &&
                  formik.errors['auctionReservePrice']
                    ? formik.errors['auctionReservePrice']
                    : undefined
                }
                perma={'ETH'}
              />
            </Stack>

            <Button
              align={'center'}
              justify={'center'}
              alignSelf={'center'}
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={defaultFormAdvancedToggle}
              gap={'x3'}
              py={'x3'}
              mb={'x8'}
            >
              Advanced
              <Icon id={showAdvanced ? 'chevronUp' : 'chevronDown'} />
            </Button>
            <motion.div
              className={defaultFormAdvancedWrapper}
              variants={animation}
              initial={'init'}
              animate={showAdvanced ? 'open' : 'init'}
            >
              <SmartInput
                {...formik.getFieldProps('proposalThreshold')}
                inputLabel={'Proposal Threshold'}
                type={NUMBER}
                formik={formik}
                id={'proposalThreshold'}
                onChange={({ target }: BaseSyntheticEvent) => {
                  formik.setFieldValue('proposalThreshold', parseFloat(target.value))
                }}
                onBlur={formik.handleBlur}
                helperText={
                  'This is the percentage of all existing tokens that must be owned by someone attempting to create a proposal. We recommend a starting value of 0.5% to encourage participation.'
                }
                errorMessage={
                  formik.touched['proposalThreshold'] &&
                  formik.errors['proposalThreshold']
                    ? formik.errors['proposalThreshold']
                    : undefined
                }
                perma={'%'}
                step={0.1}
              />
              <SmartInput
                {...formik.getFieldProps('quorumThreshold')}
                inputLabel={'Quorum Threshold'}
                type={NUMBER}
                formik={formik}
                id={'quorumThreshold'}
                onChange={({ target }: BaseSyntheticEvent) => {
                  formik.setFieldValue('quorumThreshold', parseFloat(target.value))
                }}
                onBlur={formik.handleBlur}
                helperText={
                  'This is the percentage of all existing tokens that must vote in a proposal in order for it to pass (as long as a majority of votes approve). We recommend a starting value of 10%.'
                }
                errorMessage={
                  formik.touched['quorumThreshold'] && formik.errors['quorumThreshold']
                    ? formik.errors['quorumThreshold']
                    : undefined
                }
                perma={'%'}
                step={1}
              />
            </motion.div>

            <Flex>
              <Button
                justify={'center'}
                align={'center'}
                h={'x15'}
                minH={'x15'}
                minW={'x15'}
                onClick={() => handlePrev()}
                className={defaultBackButton}
                aria-label="Back"
              >
                <Icon id="arrowLeft" />
              </Button>
              <Button
                h={'x15'}
                className={defaultFormButtonWithPrev}
                type={'submit'}
                disabled={!isEmpty(formik.errors) || formik.isSubmitting}
                onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                Continue
              </Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
