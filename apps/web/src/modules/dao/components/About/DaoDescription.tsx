import { Box, Button, Flex } from '@zoralabs/zord'
import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { daoDescription, fadingEffect } from './mdRender.css'

export const DaoDescription = ({ description }: { description?: string }) => {
  const [isOverHeight, setIsOverHeight] = React.useState(false)

  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('textRef.current', textRef.current?.clientHeight)
    if (
      textRef.current &&
      textRef?.current?.scrollHeight > textRef?.current?.clientHeight
    ) {
      setIsOverHeight(true)
    }
  }, [])

  const correctedDescription = React.useMemo(() => {
    if (typeof description === 'string') {
      return description.replace(/\\n/g, '\n').replace(/\\r/g, '\r')
    }
  }, [description])
  if (!correctedDescription) return null

  return (
    <Flex direction="column" align="flex-end">
      <Box
        mt={{ '@initial': 'x4', '@768': 'x6' }}
        py="x2"
        px={{ '@initial': 'x2', '@768': 'x4' }}
        borderRadius={'phat'}
        borderStyle={'solid'}
        borderWidth={'normal'}
        borderColor={'border'}
        ref={textRef}
        width="100%"
        className={isOverHeight ? fadingEffect : ''}
        style={{
          maxHeight: isOverHeight ? '320px' : 'none',
        }}
      >
        <ReactMarkdown
          className={daoDescription}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
        >
          {correctedDescription}
        </ReactMarkdown>
      </Box>
      <Button
        variant="ghost"
        onClick={() => setIsOverHeight(!isOverHeight)}
        size="sm"
        px={'x0'}
      >
        {isOverHeight ? 'Read More' : 'Collapse'}
      </Button>
    </Flex>
  )
}
