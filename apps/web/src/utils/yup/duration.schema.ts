import * as Yup from 'yup'

export const durationValidationSchema = Yup.object()
  .shape({
    seconds: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, '>= 0')
      .max(60, '<= 60 seconds'),
    minutes: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, '>= 0')
      .max(60, '<= 60 minutes'),
    days: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, '>= 0'),
    hours: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, '>= 0')
      .max(24, '<= 24 hours'),
  })
  .test('valueCheck', 'Value below minimum', (value) => {
    const values = Object.values(value).map((num) => {
      return Number.isNaN(num) || typeof num === 'undefined' ? 0 : num
    })
    return values.filter((val) => val > 0).length > 0
  })
