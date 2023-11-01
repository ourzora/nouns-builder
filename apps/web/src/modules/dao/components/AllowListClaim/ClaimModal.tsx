import { Text } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import AnimatedModal from 'src/components/Modal/AnimatedModal'

export const ClaimModal = () => {
  const {
    query: { claim },
  } = useRouter()

  useEffect(() => {
    document.body.style.overflow = !!claim ? 'hidden' : 'unset'
  }, [claim])

  return (
    <AnimatedModal open={!!claim}>
      <Text>Hello</Text>
    </AnimatedModal>
  )
}
