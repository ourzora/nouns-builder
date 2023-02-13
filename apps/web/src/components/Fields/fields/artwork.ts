import { ARTWORK, TEXTAREA } from 'src/components/Fields/types'
import * as Yup from 'yup'

export const setUpArtworkFields = [
  {
    name: 'projectDescription',
    inputLabel: 'Collection Description',
    type: TEXTAREA,
    placeholder: 'Nouns is an experiment which combines...',
  },
  {
    name: 'artwork',
    inputLabel: 'Artwork',
    type: ARTWORK,
    helperText:
      'Builder uses folder hierarchy to organize your assets. Upload a single folder containing a subfolder for each trait. Each subfolder should contain every variant for that trait.',
  },
]

export const validateSetUpArtwork = Yup.object().shape({
  projectDescription: Yup.string().required('*').max(5000, '< 5000 characters'),
  artwork: Yup.array()
    .of(
      Yup.object().shape({
        trait: Yup.string(),
        properties: Yup.array().of(Yup.string()),
      })
    )
    .min(1, 'artwork required'),
})
