import { FieldAnnotation } from './FieldAnnotation'
import { Flex } from './Flex'
import { Stack } from './Stack'
import { switchThumb, switchWrapper } from './Switch.css'
import { Text, textVariants } from './Text'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { ReactNode } from 'react'

export interface SwitchProps {
  id?: string
  value?: string
  label?: string
  textVariant?: keyof typeof textVariants['variant']
  description?: string | ReactNode
  descriptionVariant?: keyof typeof textVariants['variant']
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  onChange?: () => void
}

export function Switch({
  id,
  value,
  label,
  description,
  descriptionVariant,
  defaultChecked,
  checked,
  disabled,
  onChange,
  textVariant = 'label-sm',
}: SwitchProps) {
  return (
    <Flex gap="x2">
      <SwitchPrimitive.Root
        id={id}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        disabled={disabled}
        className={switchWrapper()}
      >
        <SwitchPrimitive.Thumb className={switchThumb()} />
      </SwitchPrimitive.Root>

      <Stack>
        {label && (
          <Text as="label" htmlFor={id} variant={textVariant}>
            {label}
          </Text>
        )}

        {description && (
          <FieldAnnotation
            description={description}
            variant={descriptionVariant}
            indentFields={false}
          />
        )}
      </Stack>
    </Flex>
  )
}
