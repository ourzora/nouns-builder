import { Box, Stack, Text } from '@zoralabs/zord'
import { useFormikContext } from 'formik'
import { useBalance } from 'wagmi'

import { useDaoStore } from 'src/modules/dao'
import { useLayoutStore } from 'src/stores'
import { useChainStore } from 'src/stores/useChainStore'

import { EscrowFormValues } from './EscrowForm.schema'

export default function EscrowDetailsDisplay() {
  const { values } = useFormikContext<EscrowFormValues>()
  const isMobile = useLayoutStore((x) => x.isMobile)

  const { treasury } = useDaoStore((state) => state.addresses)
  const chain = useChainStore((x) => x.chain)
  const { data: treasuryBalance } = useBalance({
    address: treasury,
    chainId: chain.id,
  })

  const totalEscrowAmount = values?.milestones
    .map((x) => x.amount)
    .reduce((acc, x) => acc + x, 0)
  return (
    <Box
      position={isMobile ? 'relative' : 'absolute'}
      style={{
        height: '100%',
        maxWidth: isMobile ? '100%' : '50%',
      }}
      top={'x0'}
      right={'x0'}
    >
      <Stack position={'sticky'} top={'x20'} right={'x0'} gap={'x5'} align="flex-end">
        {Number(totalEscrowAmount) > Number(treasuryBalance?.formatted) && (
          <Text variant="paragraph-sm" color="negative">
            Escrow amount exceeding treasury balance
          </Text>
        )}
        <Box>
          <Text fontSize={12} color="text4" style={{ fontWeight: 'bold' }}>
            Total Escrow Amount
          </Text>
          <Text variant="heading-sm" style={{ fontWeight: 'bold' }}>
            {totalEscrowAmount ?? '0.00'} ETH
          </Text>
        </Box>
        <Box style={{ textAlign: 'right' }}>
          <Text fontSize={12} color="text4" style={{ fontWeight: 'bold' }}>
            Escrow Service by
          </Text>
          <Text variant="heading-sm" style={{ fontWeight: 'bold' }}>
            SmartInvoice
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}
