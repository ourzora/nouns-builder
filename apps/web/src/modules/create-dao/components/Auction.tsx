import React from 'react'
import { Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import { Button, Flex, Stack } from '@zoralabs/zord'
import {
  auctionSettingsFields,
  validateAuctionSettings,
  votingSettingsFields,
} from 'src/components/Fields/fields/auction'
import { useFormStore } from 'src/stores/useFormStore'
import { auctionSettingsProps } from 'src/typings'
import FieldSwitch from 'src/components/Fields/FieldSwitch'
import {
  defaultBackButton,
  defaultFormAdvancedToggle,
  defaultFormAdvancedWrapper,
  defaultFormButtonWithPrev,
} from 'src/components/Fields/styles.css'
import { isEmpty } from 'src/utils/helpers'
import { Icon } from 'src/components/Icon/Icon'

interface AuctionSettingsProps {
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

interface AuctionFormValues extends auctionSettingsProps {}

export const Auction: React.FC<AuctionSettingsProps> = ({ title }) => {
  const {
    setAuctionSettings,
    auctionSettings,
    setFulfilledSections,
    setActiveSection,
    activeSection,
  } = useFormStore()

  const initialValues: AuctionFormValues = {
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

  const handleSubmit = (values: AuctionFormValues) => {
    setAuctionSettings(values)
    setFulfilledSections(title)
    setActiveSection(activeSection + 1)
  }

  const handlePrev = () => {
    setActiveSection(activeSection - 1)
  }

  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false)

  return (
    <>
      <Formik<AuctionFormValues>
        initialValues={initialValues}
        validationSchema={validateAuctionSettings}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validateOnMount={true}
        validateOnBlur={false}
      >
        {(formik) => (
          <Form>
            <Flex direction={'column'} w={'100%'}>
              <Stack>
                {auctionSettingsFields.map((f, i) => (
                  <FieldSwitch key={i} formik={formik} field={f} autoSubmit={false} />
                ))}
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
                {votingSettingsFields.map((f, i) => (
                  <FieldSwitch key={i} formik={formik} field={f} autoSubmit={false} />
                ))}
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
    </>
  )
}
