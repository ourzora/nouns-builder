import React from 'react'

import { DefaultLayout } from 'src/layouts/DefaultLayout'
import { LayoutWrapper } from 'src/layouts/LayoutWrapper'
import Dashboard from 'src/modules/dashboard/Dashboard'

const DashboardPage = () => {
  return (
    <LayoutWrapper>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </LayoutWrapper>
  )
}

export default DashboardPage
