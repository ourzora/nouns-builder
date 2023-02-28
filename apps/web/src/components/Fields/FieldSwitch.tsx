import { FormikProps } from 'formik'
import React, { BaseSyntheticEvent, ReactElement, ReactNode } from 'react'

import { ArtworkUpload } from 'src/modules/create-dao'
import { compareAndReturn } from 'src/utils/helpers'

import SingleImageUpload from '../SingleImageUpload/SingleImageUpload'
import AdminVetoInput from './AdminVetoInput'
import AdminVetoRadio from './AdminVetoRadio'
import Date from './Date'
import DaysHoursMins from './DaysHoursMins'
import DaysHoursMinsSecs from './DaysHoursMinsSecs'
import MinsSecs from './MinsSecs'
import Select from './Select'
import SmartInput from './SmartInput'
import TextArea from './TextArea'
import {
  ADMIN_VETO_INPUT,
  ADMIN_VETO_RADIO,
  ARTWORK,
  DATE,
  DAYS_HOURS_MINS,
  DAYS_HOURS_MINS_SECS,
  MINS_SECS,
  NUMBER,
  SELECT,
  SINGLE_IMAGE_UPLOAD,
  TEXT,
  TEXTAREA,
} from './types'

interface FieldSwitchProps {
  field: {
    type: string
    name: string
    inputLabel: string | ReactElement
    helperText?: string
    max?: number
    min?: number
    perma?: string
    step?: number
    placeholder?: any
    disabled?: boolean
    minHeight?: number
    isAddress?: boolean
  }
  formik: FormikProps<any>
  autoSubmit?: boolean
  children?: ReactNode
  setHasConfirmed?: (hasConfirmed: { state: boolean | null; values: {}[] }) => void
  hasConfirmed?: { state: boolean | null; values: {}[] | null }
  options?: any[] | {}
  submitCallback?: (values: any) => void
  parentValues?: any
}

const FieldSwitch: React.FC<FieldSwitchProps> = ({
  field,
  formik,
  autoSubmit,
  submitCallback,
  setHasConfirmed,
  hasConfirmed,
  options,
  parentValues,
}) => {
  React.useEffect(() => {
    /*

      compare initial values against entered values
      and null confirmation of changes on value change

    */
    if (!!hasConfirmed?.state && !!setHasConfirmed) {
      let updates = compareAndReturn(formik.initialValues, formik.values)

      setHasConfirmed({ state: hasConfirmed.state, values: updates })
    }
  }, [formik.values])

  /*

        handle smartInput onChange

   */
  const handleChange = (e: BaseSyntheticEvent) => {
    const { value } = e.target
    if (!formik) return

    formik.setFieldValue(field.name, field.type === NUMBER ? parseFloat(value) : value)
  }

  switch (field.type) {
    case ARTWORK:
      return (
        <ArtworkUpload
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={field.helperText}
          errorMessage={
            formik.touched[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
        />
      )
    case DATE:
      return (
        <Date
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
          errorMessage={
            formik.touched[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
          placeholder={field.placeholder}
          autoSubmit={autoSubmit}
          parentValues={parentValues}
          disabled={field.disabled}
        />
      )
    case DAYS_HOURS_MINS:
      return (
        <DaysHoursMins
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
          placeholder={field.placeholder}
        />
      )
    case DAYS_HOURS_MINS_SECS:
      return (
        <DaysHoursMinsSecs
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
          placeholder={field.placeholder}
        />
      )
    case ADMIN_VETO_RADIO:
      return (
        <AdminVetoRadio
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
          errorMessage={
            formik.touched[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
        />
      )
    case ADMIN_VETO_INPUT:
      return (
        <AdminVetoInput
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          type={field.type}
          formik={formik}
          id={field.name}
          onChange={(e: BaseSyntheticEvent) => {
            handleChange(e)
          }}
          onBlur={formik.handleBlur}
          helperText={field.helperText}
          errorMessage={
            formik.values[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
          autoSubmit={autoSubmit}
          submitCallback={submitCallback}
          max={field.max}
          perma={field.perma}
          placeholder={field.placeholder}
          step={field.step}
          // ensIsValid={ensIsValid}
          isAddress={field.isAddress}
          disabled={field.disabled}
        />
      )
    /////////
    case SINGLE_IMAGE_UPLOAD:
      return (
        <SingleImageUpload
          {...formik.getFieldProps(field.name)}
          formik={formik}
          id={field.name}
          inputLabel={field.inputLabel}
          helperText={field.helperText}
        />
      )
    case SELECT:
      return (
        <Select
          options={options}
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
        />
      )
    case TEXT:
    case NUMBER:
      return (
        <SmartInput
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          type={field.type}
          formik={formik}
          id={field.name}
          onChange={(e: BaseSyntheticEvent) => {
            handleChange(e)
          }}
          onBlur={formik.handleBlur}
          helperText={field.helperText}
          errorMessage={
            formik.values[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
          autoSubmit={autoSubmit}
          submitCallback={submitCallback}
          max={field.max}
          perma={field.perma}
          placeholder={field.placeholder}
          step={field.step}
          disabled={field.disabled}
          isAddress={field.isAddress}
        />
      )

    case TEXTAREA:
      return (
        <TextArea
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={field.helperText}
          errorMessage={
            formik.values[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
          autoSubmit={autoSubmit}
          placeholder={field.placeholder}
          minHeight={field.minHeight}
        />
      )
    case MINS_SECS:
      return (
        <MinsSecs
          {...formik.getFieldProps(field.name)}
          inputLabel={field.inputLabel}
          formik={formik}
          id={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched[field.name] && formik.errors[field.name]
              ? formik.errors[field.name]
              : undefined
          }
        />
      )
    default:
      return null
  }
}

export default FieldSwitch
