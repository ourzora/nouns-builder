import { Flex } from '@zoralabs/zord'
import { utils } from 'ethers'
import { isEqual } from 'lodash'
import React from 'react'
import Form from 'src/components/Fields/Form'
import { TEXT, TEXTAREA } from 'src/components/Fields/types'
import { useCustomTransactionStore } from 'src/modules/transaction-builder/stores/useCustomTransactionStore'
import {
  matchInputFromName,
  matchTypeParameters,
  normalizePathName,
  RAW_DATA_KEY,
} from 'src/utils/formABI'
import { camelToTitle } from 'src/utils/helpers'
import * as Yup from 'yup'

interface ArgumentsProps {
  title: string
}

export const Arguments: React.FC<ArgumentsProps> = ({ title }) => {
  const { customTransaction, composeCustomTransaction } = useCustomTransactionStore()

  /*
  
  construct fields

 */
  const typeHelperText: any = {
    ['address[]']: 'address[] - two or more addresses seperated by a " , "',
  }

  const fields = React.useMemo(() => {
    function getFieldsFromInputs(path: string[], inputs: any) {
      let result: any = []
      inputs.forEach((input: any) => {
        if (input.type === 'tuple') {
          result = result.concat(
            getFieldsFromInputs([...path, input.name], input.components)
          )
        } else {
          const name = normalizePathName(input.name, path)
          result.push({
            inputLabel: name,
            helperText: typeHelperText[input.type] || input.type,
            placeholder: camelToTitle(input.name),
            name,
            path: path,
            type: TEXT,
          })
        }
      })
      return result
    }

    if (customTransaction.contract) {
      return getFieldsFromInputs([], customTransaction.function?.inputs)
    } else {
      return [
        {
          inputLabel: 'Raw Calldata',
          helperText: 'Call data as hex (Leave blank to just send value)',
          name: RAW_DATA_KEY,
          type: TEXTAREA,
        },
      ]
    }
  }, [customTransaction?.function])

  /*

     submit callback
       
   */

  const submitCallback = React.useCallback(
    (values: typeof initialValues) => {
      const args = fields.reduce((acc: any[] = [], cv: any) => {
        acc.push([cv.name, values[cv.name]])

        return acc
      }, [])
      composeCustomTransaction({ ...customTransaction, arguments: args })
    },
    [customTransaction, fields]
  )

  /*
    
    construct field validation
  
   */
  //TODO:: use argument type to create validation i.e uint256, address, etc.
  const validationSchema = React.useMemo(() => {
    if (!fields.length) return

    const validators = fields.reduce((acc = Yup.object().shape({}), cv: any) => {
      if (cv.name === RAW_DATA_KEY) {
        return {
          [cv.name]: Yup.string().test(
            'is valid hex string',
            'invalid hex string',
            (value: string | undefined) => !!(!value || utils.isHexString(value))
          ),
        }
      }
      const matchedInput = matchInputFromName(cv.name, customTransaction.function.inputs)

      const type = matchedInput ? matchedInput.type : 'unknown'

      const { argumentTypePrefix, isArray } = matchTypeParameters(type)

      const _concat = () => {
        if (isArray) {
          return {
            [cv.name]: Yup.string()
              .required('*')
              .test('is valid abi type', 'valid abi type', (value) => {
                const list = value?.replace(/\s/g, '').split(',')
                try {
                  utils.defaultAbiCoder.encode([type], [list])
                  return true
                } catch (e) {
                  return false
                }
              }),
          }
        }
        switch (argumentTypePrefix) {
          case 'address':
            return {
              [cv.name]: Yup.string()
                .required('*')
                .test(
                  'isValidAddress',
                  'invalid address',
                  (value: string | undefined) => !!value && utils.isAddress(value)
                ),
            }
          case 'unknown':
            return {}
          default: {
            return {
              [cv.name]: Yup.string()
                .required('*')
                .test('is valid abi', 'invalid abi type', (value: string | undefined) => {
                  if (value === undefined) {
                    return false
                  }
                  try {
                    utils.defaultAbiCoder.encode([type], [value])
                    return true
                  } catch (e) {
                    return false
                  }
                }),
            }
          }
        }
      }
      return { ...acc, ..._concat() }
    }, [])

    return Yup.object().shape({ ...validators })
  }, [fields])

  /*

    initialValues

   */
  // TODO(iain): Fix this functionality
  const initialValues = React.useMemo(() => {
    if (!customTransaction.arguments?.length)
      return fields.reduce((acc: {} = {}, cv: { inputLabel: string }) => {
        acc = { ...acc, [cv.inputLabel]: '' }

        return acc
      }, [])

    const stored = customTransaction?.arguments?.map((_: any, key: any) => key)
    const current = fields.reduce((acc: string[] = [], cv: any) => {
      acc.push(cv.name)
      return acc
    }, [])

    let args = {}
    for (const [key, value] of customTransaction?.arguments) {
      let arg = { [key]: value }
      args = { ...args, ...arg }
    }

    return isEqual(stored.sort(), current.sort()) ? { ...args } : {}
  }, [customTransaction?.arguments, fields])

  return (
    <Flex direction={'column'}>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
        submitCallback={submitCallback}
        transactionSectionTitle={title}
        isSubForm={true}
        buttonText={'Next'}
        validateOnBlur={true}
      />
    </Flex>
  )
}
