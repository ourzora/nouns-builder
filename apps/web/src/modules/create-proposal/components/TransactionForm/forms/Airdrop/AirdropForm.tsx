import { useCallback } from 'react'
import type { FC } from 'react'
import { Formik, Form } from 'formik'
import type { FormikHelpers } from 'formik'
import { Box, Flex, Button } from '@zoralabs/zord'
import airdropFormSchema, { AirdropFormValues } from './AirdropForm.schema'
import Input from 'src/components/Input/Input'
import { Icon } from 'src/components/Icon'

export interface AirdropFormProps {
  onSubmit?: (
    values: AirdropFormValues,
    actions: FormikHelpers<AirdropFormValues>
  ) => void
  disabled?: boolean
}

const AirdropForm: FC<AirdropFormProps> = ({ onSubmit, disabled }) => {
  const initialValues: AirdropFormValues = {
    recipientAddress: '',
    amount: 0,
  }

  const handleSubmit = useCallback(
    (values: AirdropFormValues, actions: FormikHelpers<AirdropFormValues>) => {
      onSubmit?.(values, actions)
    },
    [onSubmit]
  )

  return (
    <Box w={'100%'}>
      <Formik
        initialValues={initialValues}
        validationSchema={airdropFormSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnMount={false}
        validateOnChange={false}
      >
        {({ errors, touched, isValid, isValidating, dirty }) => (
          <Box
            data-testid="airdrop-form"
            as={'fieldset'}
            disabled={isValidating || disabled}
            style={{ outline: 0, border: 0, padding: 0, margin: 0 }}
          >
            <Flex as={Form} direction={'column'}>
              <Input
                name={'recipientAddress'}
                label={'Recipient Wallet Address/ENS'}
                type={'text'}
                placeholder={'0x...'}
                autoComplete={'off'}
                secondaryLabel={
                  <Icon
                    id={'checkInCircle'}
                    fill={'positive'}
                    style={{
                      opacity:
                        typeof errors.recipientAddress === 'undefined' && dirty ? 1 : 0,
                      transition: '0.1s opacity',
                    }}
                  />
                }
                error={
                  touched.recipientAddress && errors.recipientAddress
                    ? errors.recipientAddress
                    : undefined
                }
              />

              <Box mt={'x5'}>
                <Input
                  name={'amount'}
                  label={'Amount'}
                  secondaryLabel={'Tokens'}
                  autoComplete={'off'}
                  type={'number'}
                  placeholder={0}
                  min={0}
                  error={touched.amount && errors.amount ? errors.amount : undefined}
                />
              </Box>

              <Button
                mt={'x9'}
                variant={'outline'}
                borderRadius={'curved'}
                type="submit"
                disabled={!isValid || disabled}
              >
                Add Transaction to Queue
              </Button>
            </Flex>
          </Box>
        )}
      </Formik>
    </Box>
  )
}

export default AirdropForm
