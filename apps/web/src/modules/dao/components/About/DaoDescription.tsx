import { Box, Button, Flex, Text } from '@zoralabs/zord'
import HTMLReactParser from 'html-react-parser'
import React, { useEffect, useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { daoDescription as plainDesciption } from 'src/styles/About.css'
import { isPossibleMarkdown } from 'src/utils/helpers'

import { daoDescription, fadingEffect } from './mdRender.css'

export const DaoDescription = ({ description }: { description?: string }) => {
  const [isOverHeight, setIsOverHeight] = React.useState(false)

  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  const isMarkdown = useMemo(() => {
    if (!description) return false
    return isPossibleMarkdown(description)
  }, [description])
  if (!correctedDescription || !description) return null

  // This regex check is large. Memoizing it for perf

  if (!isMarkdown)
    return (
      <Box mt={{ '@initial': 'x4', '@768': 'x6' }}>
        <Text className={plainDesciption}>
          {HTMLReactParser(description.replace(/\\n/g, '<br />'))}
        </Text>
      </Box>
    )

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
