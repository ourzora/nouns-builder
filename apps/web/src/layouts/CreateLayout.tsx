import { ReactElement, ReactNode } from 'react'

function CreateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function getCreateLayout(page: ReactElement) {
  return <CreateLayout>{page}</CreateLayout>
}
