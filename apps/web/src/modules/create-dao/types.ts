import { ReactElement } from 'react'

export interface CreateFormSection {
  title: string
  heading?: string | string[]
  subHeading?: string | string[]
  form: ReactElement
}
