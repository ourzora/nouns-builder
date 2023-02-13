import { SINGLE_IMAGE_UPLOAD, TEXT } from 'src/components/Fields/types'
import * as Yup from 'yup'

export const generalInfoFields = [
  {
    name: 'daoAvatar',
    inputLabel: 'Dao avatar',
    type: SINGLE_IMAGE_UPLOAD,
    helperText: 'Upload',
  },
  {
    name: 'daoName',
    inputLabel: 'Dao Name',
    type: TEXT,
    helperText: 'This is the full name of your DAO (ex: "Nouns")',
    placeholder: 'Nouns',
  },
  {
    name: 'daoSymbol',
    inputLabel: 'Dao Symbol',
    type: TEXT,
    helperText:
      'This will show up on-chain as the name of the project and as the name of each NFT , (ex:  "NOUNS #60")',
    placeholder: '$NOUNS',
  },
  {
    name: 'daoWebsite',
    inputLabel: 'Dao Website',
    type: TEXT,
    placeholder: 'https://www.nouns.wtf',
  },
]

const re =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
export const validateGeneralInfo = Yup.object().shape({
  daoAvatar: Yup.string(),
  daoName: Yup.string().required('*').max(255),
  daoSymbol: Yup.string()
    .max(24, '<= 24 characters')
    .matches(/^[$]*[a-zA-Z0-9_-]*$/i)
    .required('*'),
  daoWebsite: Yup.string()
    .transform((value: string) => value.replace(/\/$/, ''))
    .matches(re, 'invalid url'),
})
