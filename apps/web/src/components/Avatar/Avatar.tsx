import { Box, BoxProps } from '@zoralabs/zord'
import { useMemo } from 'react'

import { gradientForAddress } from 'src/utils/gradient'

import { avatar, avatarVariants } from './Avatar.css'

export interface AvatarProps extends Omit<BoxProps, 'size'> {
  address?: string
  size?: keyof typeof avatarVariants['size']
  variant?: keyof typeof avatarVariants['variant']
  src?: string | null
}

export function Avatar({
  address,
  className,
  size,
  variant,
  src,
  ...props
}: AvatarProps) {
  const background = useMemo(() => {
    if (address && !src) {
      const gradient = gradientForAddress(address)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else if (src) {
      return `#FFFFFF`
    } else {
      return `transparent`
    }
  }, [address, src])

  return (
    <Box
      className={['zora-avatar', avatar({ size, variant }), className]}
      style={{ background }}
      {...props}
    >
      {src && (
        <img
          key={src}
          src={src}
          alt={address || 'Avatar image'}
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
