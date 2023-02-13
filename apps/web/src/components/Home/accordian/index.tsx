import AccordionItem from './AccordionItem'
import { Stack } from '@zoralabs/zord'
import React, { ReactElement } from 'react'

const Accordion: React.FC<{ items: { title: string; description: ReactElement }[] }> = ({
  items,
}) => {
  return (
    <Stack>
      {items?.map((item, key) => (
        <AccordionItem key={key} title={item.title} description={item.description} />
      ))}
    </Stack>
  )
}

export default Accordion
