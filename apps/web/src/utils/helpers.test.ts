import { assert } from 'vitest'
import { formatDate } from './helpers'

it('should format the date as a readable string', () => {
  const result = formatDate(new Date(2022, 11, 5), true)
  assert.equal(result, '12/05/2022')
})

it('should format the date as a readable string', () => {
  const result = formatDate('2022-12-05', true)
  assert.equal(result, '12/05/2022')
})

it('should format the date as a non-readable string', () => {
  const result = formatDate(new Date(2022, 11, 5), false)
  assert.equal(result, '2022-12-05')
})

it('should format the date as a non-readable string', () => {
  const result = formatDate('2022-12-05', false)
  assert.equal(result, '2022-12-05')
})

// without readable arg - default is false
it('should format the date as a non-readable string', () => {
  const result = formatDate('2022-12-05')
  assert.equal(result, '2022-12-05')
})
