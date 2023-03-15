import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import getAddresses from 'src/data/contract/requests/getDAOAddresses'
import { useDaoStore } from 'src/modules/dao'
import { AddressType } from 'src/typings'

import { DefaultLayout } from './DefaultLayout'
import { LayoutWrapper } from './LayoutWrapper'

function DaoLayout({ children }: { children: ReactNode }) {
  const {
    query: { token },
  } = useRouter()

  const setAddresses = useDaoStore((state) => state.setAddresses)

  const { data } = useSWR(
    token ? [SWR_KEYS.DAO_ADDRESSES, token] : null,
    async () => await getAddresses(token as AddressType)
  )

  useEffect(() => {
    if (data) {
      setAddresses({
        token: token as AddressType,
        auction: data?.auction,
        governor: data?.governor,
        metadata: data?.metadata,
        treasury: data?.treasury,
      })
    }
  }, [setAddresses, data, token])

  return <>{children}</>
}

export function getDaoLayout(page: ReactElement) {
  return (
    <LayoutWrapper>
      <DefaultLayout>
        <DaoLayout>{page}</DaoLayout>
      </DefaultLayout>
    </LayoutWrapper>
  )
}
