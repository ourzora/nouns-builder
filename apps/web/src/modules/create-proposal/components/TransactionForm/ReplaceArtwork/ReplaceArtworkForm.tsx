import { Box, Button, Flex, Text, atoms } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import React, { useState } from 'react'

import { defaultHelperTextStyle } from 'src/components/Fields/styles.css'
import { Icon } from 'src/components/Icon'
import { Uploading } from 'src/components/Uploading'
import { useArtworkStore } from 'src/modules/create-proposal/stores/useArtworkStore'

import { ArtworkUpload } from './ArtworkUpload'
import { checkboxHelperText, checkboxStyleVariants } from './ReplaceArtworkForm.css'
import { ArtworkFormValues, validationSchemaArtwork } from './ReplaceArtworkForm.schema'

export interface InvalidProperty {
  currentVariantCount: number
  currentLayerName: string
  nextName: string
}
export interface ReplaceArtworkFormProps {
  disabled: boolean
  isPropertyCountValid: boolean
  propertiesCount: number
  invalidProperty?: InvalidProperty
  handleSubmit: (values: ArtworkFormValues) => void
}

export const ReplaceArtworkForm: React.FC<ReplaceArtworkFormProps> = ({
  disabled,
  isPropertyCountValid,
  invalidProperty,
  propertiesCount,
  handleSubmit,
}) => {
  const { isUploadingToIPFS, ipfsUpload, setUpArtwork } = useArtworkStore()
  const [hasConfirmed, setHasConfirmed] = useState(false)

  const initialValues = {
    artwork: setUpArtwork?.artwork || [],
    filesLength: setUpArtwork?.filesLength || '',
  }

  const showPropertyErrors = ipfsUpload.length > 0

  return (
    <Box w={'100%'}>
      <Text className={defaultHelperTextStyle} ml="x2" style={{ marginTop: -30 }}>
        This proposal will replace all existing artwork based on the new traits you
        upload.
      </Text>
      <Text fontWeight={'display'} mt="x8">
        Requirements for Replace Artwork proposal:
      </Text>
      <Box as="ul" color="text3" mt="x6">
        <li>
          The total number of new traits must be equal to or greater than the number of
          old traits
        </li>
        <li>
          For each trait, the number of new variants must be equal to or greater than the
          number of old variants.
        </li>
        <li>
          To determine the minimum number of variants required for each trait, refer to
          the current trait position within the overall folder e.g. Top Layer, Layer #1,
          Base layer etc.
        </li>
      </Box>
      <Uploading isUploadingToIPFS={isUploadingToIPFS} />
      <Formik<ArtworkFormValues>
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur={false}
        validateOnMount={true}
        validateOnChange={true}
        validationSchema={validationSchemaArtwork}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Flex as={Form} direction={'column'} mt="x8">
            <ArtworkUpload
              {...formik.getFieldProps('artwork')}
              inputLabel={'Artwork'}
              formik={formik}
              id={'artwork'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                'Builder uses folder hierarchy to organize your assets. Upload a single folder containing a subfolder for each trait. Each subfolder should contain every variant for that trait.'
              }
              errorMessage={
                formik.touched.artwork && formik.errors?.artwork
                  ? formik.errors?.artwork
                  : undefined
              }
            />

            {showPropertyErrors && !isPropertyCountValid && (
              <Text
                w="100%"
                textAlign={'center'}
                color={'negative'}
              >{`Current total number of traits is ${propertiesCount}. The new folder of traits must have a minimum total of ${propertiesCount}`}</Text>
            )}
            {showPropertyErrors && invalidProperty && (
              <Text
                w="100%"
                textAlign={'center'}
                color={'negative'}
              >{`${invalidProperty.currentLayerName} currently has ${invalidProperty.currentVariantCount} trait variants. New trait for ${invalidProperty.currentLayerName} "${invalidProperty.nextName}" should also have minimum ${invalidProperty.currentVariantCount} trait variants.`}</Text>
            )}

            <Flex align={'center'} justify={'center'} gap={'x4'} mt="x4">
              <Flex
                align={'center'}
                justify={'center'}
                className={checkboxStyleVariants[hasConfirmed ? 'confirmed' : 'default']}
                onClick={() => setHasConfirmed((bool) => !bool)}
              >
                {hasConfirmed && <Icon fill="background1" id="check" />}
              </Flex>

              <Flex className={checkboxHelperText}>
                I confirm I have tested an artwork replacement proposal on{' '}
                <a
                  href={'https://testnet.nouns.build'}
                  target="_blank"
                  className={atoms({ color: 'accent' })}
                  rel="noreferrer"
                >
                  testnet
                </a>
              </Flex>
            </Flex>

            <Button
              mt={'x9'}
              variant={'outline'}
              borderRadius={'curved'}
              type="submit"
              disabled={
                disabled ||
                !hasConfirmed ||
                !isEmpty(formik.errors) ||
                formik.isSubmitting
              }
            >
              Add Transaction to Queue
            </Button>
          </Flex>
        )}
      </Formik>
    </Box>
  )
}
