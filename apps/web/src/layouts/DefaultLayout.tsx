import { ReactElement, ReactNode } from 'react'

function DefaultLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function getCreateLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
