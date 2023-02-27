import { Box, Flex, Text, vars } from '@zoralabs/zord'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useLayoutStore } from 'src/stores/useLayoutStore'

import ExploreSortMenu from './ExploreSortMenu'

const ExploreToolbar: React.FC<{}> = () => {
  const router = useRouter()
  const signerAddress = useLayoutStore((state) => state.signerAddress)

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      mb={signerAddress ? 'x0' : 'x5'}
      align={'center'}
      style={{ maxWidth: 912 }}
    >
      <Flex direction={'row'} w={'100%'} justify={'space-between'}>
        <Box fontSize={28} mb={'x8'}>
          {router.pathname === '/explore'
            ? 'DAOs'
            : router.pathname === '/mydaos'
            ? 'My DAOs'
            : ''}
        </Box>
        {router.pathname !== '/mydaos' && (
          <ExploreSortMenu choice={(router.query?.sortKey as string) || 'CREATED'} />
        )}
      </Flex>
      {signerAddress && (
        <>
          <Flex w={'100%'} justify={'center'}>
            <Link href={'/explore'} passHref>
              <Box
                h={'100%'}
                mb={'x4'}
                mx={'x4'}
                style={{
                  borderBottom:
                    router.pathname === '/explore' ? `2px solid black` : `0px`,
                }}
              >
                <Text variant="paragraph-md">Explore</Text>
              </Box>
            </Link>
            <Link href={'/mydaos'} passHref>
              <Box
                h={'100%'}
                mb={'x4'}
                mx={'x4'}
                style={{
                  borderBottom: router.pathname === '/mydaos' ? `2px solid black` : `0px`,
                }}
              >
                <Text variant="paragraph-md">My DAOs</Text>
              </Box>
            </Link>
          </Flex>

          <Box
            w={'100vw'}
            mb={'x5'}
            style={{ borderBottom: `2px solid ${vars.color.border}` }}
          />
        </>
      )}
    </Flex>
  )
}

export default ExploreToolbar
