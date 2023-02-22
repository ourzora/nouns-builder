import { defaultInputLabelStyle, radioStyles } from './styles.css'
import { Flex, Stack } from '@zoralabs/zord'
import { FormikErrors, FormikProps } from 'formik'
import React, { ReactElement } from 'react'

interface BurnVetoRadioProps {
  inputLabel: string | ReactElement
  formik: FormikProps<any>
  id: string
  errorMessage: string | FormikErrors<any> | string[] | undefined | FormikErrors<any>[]
  submitCallback?: (values: any) => void
}

const AdminVetoRadio: React.FC<BurnVetoRadioProps> = ({ inputLabel, formik, id }) => {
  const handleSelection = (event: any) => {
    formik.setFieldValue(id, Number(event.target.dataset.value))
    setSelected(Number(event.target.dataset.value) === 0 ? true : false)
  }

  const [selected, setSelected] = React.useState(false)
  React.useEffect(() => {
    if (formik.values.vetoPower === 0) {
      // 'Yes' is selected
      formik.setFieldValue(id, 0)
      setSelected(true)
    } else {
      // 'No' is selected
      formik.setFieldValue(id, 1)
      setSelected(false)
    }
  }, [formik, id])

  return (
    <Stack direction={'column'} mb={'x8'}>
      {inputLabel && <label className={defaultInputLabelStyle}>{inputLabel}</label>}
      <Flex direction={'row'}>
        <Flex
          align={'center'}
          justify={'center'}
          borderColor={'secondary'}
          borderRadius={'curved'}
          borderStyle={'solid'}
          width={'100%'}
          height={'x16'}
          m={'x2'}
          className={radioStyles[selected ? 'active' : 'default']}
          data-value={0}
          onClick={handleSelection}
        >
          Yes
        </Flex>
        <Flex
          align={'center'}
          justify={'center'}
          borderColor={'secondary'}
          borderRadius={'curved'}
          borderStyle={'solid'}
          width={'100%'}
          height={'x16'}
          m={'x2'}
          className={radioStyles[!selected ? 'active' : 'default']}
          data-value={1}
          onClick={handleSelection}
        >
          No
        </Flex>
      </Flex>
    </Stack>
  )
}

export default AdminVetoRadio
