import { Button, Flex, Box, Stack, Text } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import { yearsAhead } from 'src/utils/helpers'
import { PUBLIC_NOUNS_ADDRESS, PUBLIC_BUILDER_ADDRESS } from 'src/constants/addresses'
import { useEnsData } from 'src/hooks/useEnsData'
import { TokenAllocation } from 'src/typings'
import { validationSchemaContributions } from '../fields/founder'
import SmartInput from '../SmartInput'
import Date from '../Date'
import { Toggle } from './Toggle'
import { DaoCopyAddress } from './DaoCopyAddress'

export interface ContributionAllocationFormValues {
  builderAllocation?: TokenAllocation
  nounsAllocation?: TokenAllocation
}

export interface ContributionFormProps {
  initialValues: ContributionAllocationFormValues
  handleSubmit: (values: ContributionAllocationFormValues) => void
}

export const ContributionForm: React.FC<ContributionFormProps> = ({
  initialValues,
  handleSubmit,
}) => {
  const { displayName: builderDisplayName } = useEnsData(PUBLIC_BUILDER_ADDRESS)
  const { displayName: nounsDisplayName } = useEnsData(PUBLIC_NOUNS_ADDRESS)

  return (
    <Formik<ContributionAllocationFormValues>
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur={false}
      validateOnMount={true}
      validateOnChange={true}
      validationSchema={validationSchemaContributions}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const builderAllocation = formik.values.builderAllocation
        const nounsAllocation = formik.values.nounsAllocation

        return (
          <Form>
            <Stack>
              <Text fontSize={28} fontWeight={'display'} mb={'x4'}>
                Change Contributions
              </Text>

              <Box mt={'x4'}>
                <Flex justify={'space-between'} mb={'x4'}>
                  <Text fontWeight={'display'}>Builder Contribution</Text>

                  <Toggle
                    on={!!builderAllocation}
                    onToggle={() => {
                      formik.setFieldValue(
                        'builderAllocation',
                        builderAllocation
                          ? undefined
                          : {
                              founderAddress: PUBLIC_BUILDER_ADDRESS,
                              allocation: 1,
                              endDate: yearsAhead(5),
                            }
                      )
                    }}
                  />
                </Flex>

                {!!builderAllocation && (
                  <Flex direction={'row'} mt={'x4'}>
                    <DaoCopyAddress
                      name="Builder"
                      image="/builder-avatar-circle.png"
                      ens={builderDisplayName}
                      address={PUBLIC_BUILDER_ADDRESS}
                    />

                    <SmartInput
                      inputLabel={'Percentage'}
                      id={`builderAllocation.allocationPercentage`}
                      value={builderAllocation.allocationPercentage}
                      type={'number'}
                      formik={formik}
                      disabled={false}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      perma={'%'}
                      autoSubmit={false}
                      isAddress={false}
                      // @ts-ignore
                      errorMessage={formik.errors.builderAllocation?.allocation}
                    />

                    <Date
                      id={`builderAllocation.endDate`}
                      value={builderAllocation.endDate}
                      inputLabel={'End date'}
                      formik={formik}
                      autoSubmit={false}
                      disabled={false}
                      // @ts-ignore
                      errorMessage={formik.errors.builderAllocation?.endDate}
                    />
                  </Flex>
                )}
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
                    on={!!nounsAllocation}
                    onToggle={() => {
                      formik.setFieldValue(
                        'nounsAllocation',
                        nounsAllocation
                          ? undefined
                          : {
                              founderAddress: PUBLIC_NOUNS_ADDRESS,
                              allocation: 1,
                              endDate: yearsAhead(5),
                            }
                      )
                    }}
                  />
                </Flex>

                {!!nounsAllocation && (
                  <Flex direction={'row'} mt={'x4'}>
                    <DaoCopyAddress
                      name="Nouns"
                      image="/nouns-avatar-circle.png"
                      ens={nounsDisplayName}
                      address={PUBLIC_NOUNS_ADDRESS}
                    />

                    <SmartInput
                      inputLabel={'Percentage'}
                      id={`nounsAllocation.allocationPercentage`}
                      value={nounsAllocation.allocationPercentage}
                      type={'number'}
                      formik={formik}
                      disabled={false}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      perma={'%'}
                      autoSubmit={false}
                      isAddress={false}
                      // @ts-ignore
                      errorMessage={formik.errors.nounsAllocation?.allocation}
                    />

                    <Date
                      id={`nounsAllocation.endDate`}
                      value={nounsAllocation.endDate}
                      inputLabel={'End date'}
                      formik={formik}
                      autoSubmit={false}
                      disabled={false}
                      // @ts-ignore
                      errorMessage={formik.errors.nounsAllocation?.endDate}
                    />
                  </Flex>
                )}
              </Box>
            </Stack>

            <Button borderRadius="curved" type="submit" width={'100%'}>
              Save and Exit
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}
