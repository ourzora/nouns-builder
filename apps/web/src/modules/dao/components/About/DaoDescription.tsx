import { Box } from '@zoralabs/zord'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'


import { daoDescription } from './mdRender.css'

export const DaoDescription = ({ description }: { description?: string }) => {
  const correctedDescription = React.useMemo(() => {
    if (typeof description === 'string') {
      return description.replace(/\\n/g, '\n').replace(/\\r/g, '\r')
    }
  }, [description])
  if (!correctedDescription) return null

  return (
    <Box
      mt={{ '@initial': 'x4', '@768': 'x6' }}
      p="x6"
      borderRadius={'phat'}
      borderStyle={'solid'}
      borderWidth={'normal'}
      borderColor={'border'}
    >
      <ReactMarkdown
        className={daoDescription}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        // components={{
        //   h1: ({ node, ...props }) => {
        //     return (
        //       <Heading size={'xl'} mb={'x6'} mt={'x6'}>
        //         {props.children}
        //       </Heading>
        //     )
        //   },
        //   h2: ({ node, ...props }) => {
        //     return (
        //       <Heading size={'lg'} mb={'x4'} mt={'x4'}>
        //         {props.children}
        //       </Heading>
        //     )
        //   },
        //   h3: ({ node, ...props }) => {
        //     return <Heading size={'md'}>{props.children} </Heading>
        //   },
        //   p: ({ node, ...props }) => {
        //     return <Text mb="x2">{props.children}</Text>
        //   },
        // }}
      >
        {correctedDescription}
      </ReactMarkdown>
    </Box>
  )
}
