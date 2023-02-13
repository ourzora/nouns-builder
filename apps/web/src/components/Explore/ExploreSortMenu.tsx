import React from 'react'
import { Flex, Select } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import { SORT_KEY } from 'src/constants/sortKey'

interface ExploreSortMenuProps {
  choice: string
}

const ExploreSortMenu: React.FC<ExploreSortMenuProps> = ({ choice }) => {
  const router = useRouter()

  const selectionToSortKey = React.useCallback((option: string) => {
    switch (option) {
      case 'Created':
        return 'CREATED'
      case 'Price':
        return 'CHAIN_TOKEN_PRICE'
      case 'Ending':
        return 'TIMED_SALE_ENDING'
      default:
        throw new Error('Invalid sort key')
    }
  }, [])

  const handleSortChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          sortKey: selectionToSortKey(e.target.value),
        },
      })
    },
    [router, selectionToSortKey]
  )

  return (
    <Flex w={'auto'}>
      <Select
        name="Explore Sort"
        defaultValue={
          // (SORT_KEY[router?.query.sortKey] as string) is throwing a ts error
          // @ts-ignore-next-line
          router.query.sortKey ? (SORT_KEY[router?.query.sortKey] as string) : 'Created'
        }
        fontSize={16}
        onChange={(e) => handleSortChange(e)}
      >
        {Object.values(SORT_KEY).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default ExploreSortMenu
