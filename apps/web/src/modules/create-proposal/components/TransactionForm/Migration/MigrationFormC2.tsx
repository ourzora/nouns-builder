import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { Form, Formik, FormikHelpers } from 'formik'
import { useCallback, useState } from 'react'

import SmartInput from 'src/components/Fields/SmartInput'
import {
  defaultHelperTextStyle,
  defaultInputLabelStyle,
} from 'src/components/Fields/styles.css'
import { TEXT } from 'src/components/Fields/types'
import { CHAIN_ID } from 'src/typings'

import { DropdownSelect } from '../../DropdownSelect'
import MigrationFormC2Schema, { MigrationFormC2Values } from './MigrationFormC2.schema'

export interface MigrationFormC2Props {
  onSubmit?: (
    values: MigrationFormC2Values,
    actions: FormikHelpers<MigrationFormC2Values>
  ) => void
  disabled?: boolean
}

const chainOptions = [{ label: 'BASE_GOERLI', value: CHAIN_ID.BASE_GOERLI }]

export const MigrationFormC2: React.FC<MigrationFormC2Props> = ({
  onSubmit,
  disabled,
}) => {
  const [receivingChain, setReceivingChain] = useState<CHAIN_ID>(CHAIN_ID.BASE_GOERLI)

  const initialValues: MigrationFormC2Values = {
    L2: CHAIN_ID.BASE_GOERLI,
    starter: '',
  }

  const handleSubmit = useCallback(
    (values: MigrationFormC2Values, actions: FormikHelpers<MigrationFormC2Values>) => {
      onSubmit?.(values, actions)
    },
    [onSubmit]
  )

  return (
    <Box w={'100%'}>
      <Formik
        initialValues={initialValues}
        validationSchema={MigrationFormC2Schema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnMount={false}
        validateOnChange={false}
      >
        {(formik) => {
          const handleChainChange = (value: CHAIN_ID) => {
            console.log(value)
            setReceivingChain(value)
          }

          return (
            <>
              <Text mb="x8" ml="x2" className={defaultHelperTextStyle}>
                This step will deploy a mirror of this DAO on the L2 of your choice, and
                create a snapshot for members to claim their tokens.{' '}
                <a target="_blank" rel="noreferrer noopener" href="">
                  Learn more
                </a>
              </Text>
              <Box
                data-testid="migration-form-c0"
                as={'fieldset'}
                disabled={formik.isValidating || disabled}
                style={{ outline: 0, border: 0, padding: 0, margin: 0 }}
              >
                <Flex as={Form} direction={'column'}>
                  <label className={defaultInputLabelStyle}>L2 Chain</label>

                  <DropdownSelect
                    options={chainOptions}
                    value={receivingChain}
                    onChange={handleChainChange}
                  />

                  <SmartInput
                    {...formik.getFieldProps('starter')}
                    inputLabel={'L2 Starter'}
                    placeholder={'0x... or .eth'}
                    type={TEXT}
                    formik={formik}
                    id={'starter'}
                    isAddress={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      'This address will need to re-start the auctions on the L2 side, make sure it is an active wallet.'
                    }
                    errorMessage={
                      formik.touched['starter'] && formik.errors['starter']
                        ? formik.errors['starter']
                        : undefined
                    }
                  />

                  <Button
                    mt={'x9'}
                    variant={'outline'}
                    borderRadius={'curved'}
                    type="submit"
                    disabled={disabled}
                  >
                    Add Transaction to Queue
                  </Button>
                </Flex>
              </Box>
            </>
          )
        }}
      </Formik>
    </Box>
  )
}
