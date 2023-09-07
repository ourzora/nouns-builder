import axios from 'axios'
import React from 'react'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

const fetchDashboardData = async (address: string) => {
  const userDaos = await axios.get(`/api/dashboard/${address}`).then((x) => x.data)
  console.log('userDaos', userDaos)
  return userDaos
}

const Dashboard = () => {
  const { address } = useAccount()

  const { data, error, isValidating } = useSWR(
    [`dashboard:${address}`],
    address ? () => fetchDashboardData(address) : null
  )

  return <div>Dashboard</div>
}

export default Dashboard
