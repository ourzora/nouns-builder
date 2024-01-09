import { Box, Stack, atoms } from '@zoralabs/zord'
import Link from 'next/link'

import { Icon } from 'src/components/Icon'
import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { L2MigratedResponse } from 'src/pages/api/migrated'

export const DaoMigrated = ({ migrated }: { migrated: L2MigratedResponse }) => {
  const migratedToChain = PUBLIC_ALL_CHAINS.find((x) => x.id === migrated.chainId)

  return (
    <Stack align={'center'} w="100%" mt="x7">
      <Box color="text3" fontSize={18}>
        This DAO has been migrated to L2.
      </Box>
      <Link href={`/dao/${migratedToChain?.slug}/${migrated.l2TokenAddress}`}>
        <Box
          display={'inline-flex'}
          color="text3"
          mt="x1"
          fontSize={18}
          className={atoms({ textDecoration: 'underline' })}
        >
          View DAO on L2
          <Icon align="center" fill="text4" id="external-16" size="sm" />
        </Box>
      </Link>
    </Stack>
  )
}
