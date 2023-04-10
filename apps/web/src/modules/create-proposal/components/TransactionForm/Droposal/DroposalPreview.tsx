import { Box } from '@zoralabs/zord'
import { FormikProps } from 'formik'

import { MediaPreview } from 'src/components/MediaPreview/MediaPreview'

import { DroposalFormValues } from './DroposalForm.schema'

interface DroposalPreviewProps {
  formik: FormikProps<DroposalFormValues>
}

export const DroposalPreview: React.FC<DroposalPreviewProps> = ({ formik }) => {
  console.log('mediaURL', formik.values)
  return (
    <Box position={'fixed'} top="x0" right={'x0'}>
      <MediaPreview
        mediaUrl={formik.values['mediaUrl']}
        coverUrl={formik.values['coverUrl']}
        mediaType={formik.values['mediaType']}
      />
    </Box>
  )
}
