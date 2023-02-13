import { PUBLIC_MANAGER_ADDRESS } from '../constants/addresses'
import { Manager, Manager__factory } from 'src/constants/typechain'
import { useLayoutStore } from 'src/stores'

interface ManagerResponseProps {
  contract: Manager | undefined
}

const useManagerContract = () => {
  const { signer, provider } = useLayoutStore()

  const contract =
    provider && Manager__factory.connect(PUBLIC_MANAGER_ADDRESS, signer ?? provider)

  const response: ManagerResponseProps = {
    contract,
  }

  return { ...response }
}

export default useManagerContract
