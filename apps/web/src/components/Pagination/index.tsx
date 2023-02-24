import React from 'react'
import { atoms, Flex } from '@zoralabs/zord'
import { Icon } from 'src/components/Icon/Icon'
import Link from 'next/link'

type PaginationProps = {
  isFirst: boolean
  isLast: boolean
  onNext: () => {}
  onPrev: () => {}
}

const Pagination: React.FC<PaginationProps> = ({ onNext, onPrev, isFirst, isLast }) => {
  return (
    <Flex direction={'row'} w={'100%'} justify={'center'} my={'x16'}>
      <Link
        href={onPrev()}
        passHref
        className={atoms({ pointerEvents: isFirst ? 'none' : 'auto' })}
      >
        <Flex
          as="button"
          backgroundColor={'background1'}
          borderRadius={'round'}
          borderColor={'border'}
          borderStyle={'solid'}
          borderWidth={'normal'}
          p={'x1'}
          mx={'x1'}
          disabled={isFirst}
          style={{
            cursor: isFirst ? 'default' : 'pointer',
          }}
        >
          <Flex
            style={{ height: 24, width: 24 }}
            placeItems={'center'}
            justify={'center'}
          >
            <Icon id="arrowLeft" style={{ opacity: isFirst ? 0.3 : 1 }} />
          </Flex>
        </Flex>
      </Link>

      <Link
        href={onNext()}
        passHref
        className={atoms({ pointerEvents: isLast ? 'none' : 'auto' })}
      >
        <Flex
          as="button"
          backgroundColor={'background1'}
          borderRadius={'round'}
          borderColor={'border'}
          borderStyle={'solid'}
          borderWidth={'normal'}
          p={'x1'}
          mx={'x1'}
          disabled={isLast}
          style={{
            cursor: isLast ? 'default' : 'pointer',
          }}
        >
          <Flex
            style={{ height: 24, width: 24 }}
            placeItems={'center'}
            justify={'center'}
          >
            <Icon id="arrowRight" style={{ opacity: isLast ? 0.3 : 1 }} />
          </Flex>
        </Flex>
      </Link>
    </Flex>
  )
}

export default Pagination
