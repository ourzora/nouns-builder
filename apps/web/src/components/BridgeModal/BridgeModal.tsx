import { useRouter } from 'next/router'
import { useEffect } from 'react'

import AnimatedModal from '../Modal/AnimatedModal'
import { BridgeForm } from './BridgeForm'

export const BridgeModal = () => {
  const {
    query: { bridge },
  } = useRouter()

  useEffect(() => {
    document.body.style.overflow = !!bridge ? 'hidden' : 'unset'
  }, [bridge])

  return (
    <AnimatedModal open={!!bridge}>
      <BridgeForm />
    </AnimatedModal>
  )
}
