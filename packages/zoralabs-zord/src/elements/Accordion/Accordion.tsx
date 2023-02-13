import { Box, BoxProps, Icon, Text } from '..'
import * as style from './Accordion.css'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import clsx from 'clsx'
import React, { MouseEventHandler } from 'react'

export interface AccordionProps extends BoxProps {
  label?: string
  enableDeselectAll?: Boolean
  defaultState?: 'open' | 'closed'
  onDeselectAll?: MouseEventHandler
}

export function Accordion({
  defaultState = 'closed', // Hack to allow AccordionItem with value="open" to be opened by default
  label,
  enableDeselectAll,
  onDeselectAll,
  ...props
}: AccordionProps) {
  return (
    <Box {...props}>
      <AccordionPrimitive.Root
        className={clsx(style.accordion, 'zord-accordion')}
        type="single"
        defaultValue={defaultState}
        collapsible
      >
        <AccordionPrimitive.Item
          className={clsx(style.accordionItem, 'zord-accordionItem')}
          value="open"
        >
          <AccordionTrigger>
            {label && (
              <Text as="span" variant="label-sm" color="primary">
                {label}
              </Text>
            )}
            {enableDeselectAll && (
              <Text
                className={clsx(style.accordionDeselect, 'zord-accordionDeselect')}
                variant="label-sm"
                onClick={onDeselectAll}
              >
                Clear
              </Text>
            )}
          </AccordionTrigger>
          <AccordionContent>{props.children}</AccordionContent>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </Box>
  )
}

export function AccordionTrigger({ children, ...props }: BoxProps) {
  return (
    <AccordionPrimitive.Header
      className={clsx(style.accordionHeader, 'zord-accordionHeader')}
    >
      <AccordionPrimitive.Trigger
        {...props}
        className={clsx(style.accordionTrigger, 'zord-acccordionTrigger')}
      >
        {children}
        <Icon
          aria-hidden
          id="ChevronDown"
          size="md"
          className={clsx(style.accordionChevron, 'zord-accordionChevron')}
          color="tertiary"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ children, ...props }: BoxProps) {
  return (
    <AccordionPrimitive.Content
      {...props}
      className={clsx(style.accordionContent, 'zord-accordionContent')}
    >
      {children}
    </AccordionPrimitive.Content>
  )
}
