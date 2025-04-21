import { Box, BoxProps } from '@zoralabs/zord'
import Image from 'next/image'
import { useMemo } from 'react'

import { useDaoFeedCard } from 'src/modules/dao'
import { CHAIN_ID } from 'src/typings'
import { gradientForAddress } from 'src/utils/gradient'

import { avatarVariants, squareAvatar } from './Avatar.css'

export interface DaoAvatarProps extends Omit<BoxProps, 'size'> {
  collectionAddress: string
  auctionAddress: string
  chainId: CHAIN_ID
  size?: keyof (typeof avatarVariants)['size']
  variant?: keyof (typeof avatarVariants)['variant']
  src?: string | null
}

export function DaoAvatar({
  collectionAddress,
  auctionAddress,
  className,
  size,
  variant,
  src,
  chainId,
  ...props
}: DaoAvatarProps) {
  const { tokenUri } = useDaoFeedCard({
    collectionAddress: collectionAddress,
    auctionAddress: auctionAddress,
    chainId,
  })

  const background = useMemo(() => {
    if (collectionAddress && !src) {
      const gradient = gradientForAddress(collectionAddress)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else if (src) {
      return `#FFFFFF`
    } else {
      return `transparent`
    }
  }, [collectionAddress, src])

  return tokenUri?.image ? (
    <Box
      className={['zora-avatar', squareAvatar({ size, variant }), className]}
      borderColor={'border'}
      borderWidth={'thin'}
      borderStyle={'solid'}
      {...props}
    >
      <Image
        key={tokenUri?.name}
        src={tokenUri?.image}
        alt={collectionAddress || 'Avatar image'}
        style={{
          objectFit: 'cover',
        }}
        width={size}
        height={size}
      />
    </Box>
  ) : (
    <Box
      className={['zora-avatar', squareAvatar({ size, variant }), className]}
      style={{ background }}
      borderColor={'border'}
      borderWidth={'thin'}
      borderStyle={'solid'}
      {...props}
    >
      {src && (
        <Image
          key={src}
          src={src}
          alt={collectionAddress || 'Avatar image'}
          style={{
            objectFit: 'cover',
          }}
          width={size}
          height={size}
        />
      )}
    </Box>
  )
}
