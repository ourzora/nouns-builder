import { Button, Flex, Box, Stack, Text } from '@zoralabs/zord'
import { Form, Formik, FieldArray, FormikErrors, FormikTouched } from 'formik'
import { useFormStore } from 'src/stores'
import { yearsAhead } from 'src/utils/helpers'
import { PUBLIC_NOUNS_ADDRESS, PUBLIC_BUILDER_ADDRESS } from 'src/constants/addresses'
import { useEnsData } from 'src/hooks/useEnsData'
import { validationSchemaContributions } from '../fields/founder'
import SmartInput from '../SmartInput'
import Date from '../Date'
import { Toggle } from './Toggle'
import { DaoCopyAddress } from './DaoCopyAddress'
import { allocationProps } from 'src/modules/create'

export interface ContributionAllocationFormValues {
  contributionAllocation: allocationProps[]
}

export const ContributionForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: ContributionAllocationFormValues) => void
}) => {
  const contributionAllocation = useFormStore((state) => state.contributionAllocation)

  const { displayName: builderDisplayName } = useEnsData(PUBLIC_BUILDER_ADDRESS)
  const { displayName: nounsDisplayName } = useEnsData(PUBLIC_NOUNS_ADDRESS)

  const getErrorMessage = (
    index: number,
    field: keyof allocationProps,
    errors: FormikErrors<ContributionAllocationFormValues>,
    touched: FormikTouched<ContributionAllocationFormValues>
  ) => {
    if (typeof errors?.contributionAllocation?.[index] === 'string') {
      return
    }

    const error = errors?.contributionAllocation?.[index] as FormikErrors<allocationProps>
    return error?.[field] && touched?.contributionAllocation?.[index]?.[field]
      ? error?.[field]
      : undefined
  }

  return (
    <Formik<ContributionAllocationFormValues>
      initialValues={{
        contributionAllocation: contributionAllocation || [],
      }}
      enableReinitialize
      validateOnBlur={false}
      validateOnMount={true}
      validateOnChange={true}
      validationSchema={validationSchemaContributions}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <FieldArray name="contributionAllocation">
            {({ remove, push }) => {
              const builderFormValue = formik.values.contributionAllocation?.[0]
              const nounsFormValue =
                formik.values.contributionAllocation?.[1] ?? undefined
              return (
                <Stack>
                  <Text fontSize={28} fontWeight={'display'} mb={'x4'}>
                    Change Contributions
                  </Text>

                  <Box mt={'x4'}>
                    <Text fontWeight={'display'}>Builder Contribution</Text>
                    <Flex direction={'row'} mt={'x4'}>
                      <DaoCopyAddress
                        name="Builder"
                        image="/builder-avatar-circle.png"
                        ens={builderDisplayName}
                        address={PUBLIC_BUILDER_ADDRESS}
                      />

                      <SmartInput
                        inputLabel={'Percentage'}
                        id={`contributionAllocation.0.allocation`}
                        value={builderFormValue.allocation}
                        type={'number'}
                        formik={formik}
                        disabled
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        perma={'%'}
                        autoSubmit={false}
                        isAddress={false}
                      />

                      <Date
                        id={`contributionAllocation.0.endDate`}
                        value={builderFormValue.endDate}
                        inputLabel={'End date'}
                        formik={formik}
                        autoSubmit={false}
                        disabled
                        errorMessage={''}
                      />
                    </Flex>
                  </Box>

                  <Box
                    h={'x0'}
                    borderStyle={'solid'}
                    borderColor={'border'}
                    borderWidth={'thin'}
                    my={'x4'}
                  />

                  <Box mb={'x4'}>
                    <Flex justify={'space-between'} mb={'x4'}>
                      <Text fontWeight={'display'}>Nouns Contribution</Text>

                      <Toggle
                        on={!!nounsFormValue}
                        onToggle={() => {
                          if (nounsFormValue) {
                            remove(1)
                            return
                          }
                          push({
                            founderAddress: PUBLIC_NOUNS_ADDRESS,
                            allocation: 1,
                            endDate: yearsAhead(5),
                          })
                        }}
                      />
                    </Flex>

                    {!!nounsFormValue && (
                      <Flex direction={'row'} mt={'x4'}>
                        <DaoCopyAddress
                          name="Nouns"
                          image="/nouns-avatar-circle.png"
                          ens={nounsDisplayName}
                          address={PUBLIC_NOUNS_ADDRESS}
                        />

                        <SmartInput
                          inputLabel={'Percentage'}
                          id={`contributionAllocation.1.allocation`}
                          value={nounsFormValue.allocation}
                          type={'number'}
                          formik={formik}
                          disabled={false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          perma={'%'}
                          autoSubmit={false}
                          isAddress={false}
                          errorMessage={getErrorMessage(
                            1,
                            'allocation',
                            formik.errors,
                            formik.touched
                          )}
                        />

                        <Date
                          id={`contributionAllocation.1.endDate`}
                          value={formik.values.contributionAllocation[1].endDate}
                          inputLabel={'End date'}
                          formik={formik}
                          autoSubmit={false}
                          disabled={false}
                          errorMessage={getErrorMessage(
                            1,
                            'endDate',
                            formik.errors,
                            formik.touched
                          )}
                        />
                      </Flex>
                    )}
                  </Box>
                </Stack>
              )
            }}
          </FieldArray>

          <Button borderRadius="curved" type="submit" width={'100%'}>
            Save and Exit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
