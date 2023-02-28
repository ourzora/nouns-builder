import * as Yup from 'yup'

export interface GeneralFormValues {
  daoAvatar?: string
  daoName: string
  daoSymbol: string
  daoWebsite?: string
}

const re =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

export const urlValidationSchema = Yup.string()
  .transform((value: string) => value.replace(/\/$/, ''))
  .matches(re, 'invalid url')

export const generalValidationSchema = Yup.object().shape({
  daoAvatar: Yup.string(),
  daoName: Yup.string().required('*').max(255),
  daoSymbol: Yup.string()
    .max(24, '<= 24 characters')
    .matches(/^[$]*[a-zA-Z0-9_-]*$/i)
    .required('*'),
  daoWebsite: urlValidationSchema,
})
