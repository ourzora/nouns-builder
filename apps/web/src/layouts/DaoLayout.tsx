import { ReactElement, ReactNode } from 'react'

import { DaoContractAddresses, useDaoStore } from 'src/modules/dao'

import { DefaultLayout } from './DefaultLayout'
import { LayoutWrapper } from './LayoutWrapper'

function DaoLayout({
  children,
  addresses,
}: {
  children: ReactNode
  addresses: DaoContractAddresses
}) {
  useDaoStore((state) => (state.addresses = addresses))

  return <>{children}</>
}

export function getDaoLayout(page: ReactElement) {
  const addresses = (page.props as any)?.addresses ?? {}

  return (
    <LayoutWrapper>
      <DefaultLayout>
        <DaoLayout addresses={addresses}>{page}</DaoLayout>
      </DefaultLayout>
    </LayoutWrapper>
  )
}
