import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import { useContractRead } from 'wagmi'

import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import { managerAbi } from 'src/data/contract/abis'
import { useDaoStore } from 'src/stores'
import { AddressType } from 'src/typings'

function DaoLayout({ children }: { children: ReactNode }) {
  const {
    query: { token },
  } = useRouter()

  const setAddresses = useDaoStore((state) => state.setAddresses)

  const { data } = useContractRead({
    enabled: !!token,
    abi: managerAbi,
    address: PUBLIC_MANAGER_ADDRESS,
    functionName: 'getAddresses',
    args: [token as AddressType],
  })

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

  if (!data) return null

  return <>{children}</>
}

export function getDaoLayout(page: ReactElement) {
  return <DaoLayout>{page}</DaoLayout>
}
