import NextImage, { ImageProps as NextImageProps } from 'next/image'
import NextLegacyImage, { ImageProps as NextLegacyImageProps } from 'next/legacy/image'
import React, { useCallback, useState } from 'react'

/* -------------------------------------------------------------------------- */
/*                                Shared Hook                                 */
/* -------------------------------------------------------------------------- */

const useFallbackSrc = (srcList: string[] = []) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const src = srcList[currentIndex] || '/ImageError.svg'

  const handleError = useCallback(() => {
    if (currentIndex < srcList.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, srcList.length])

  return { src, handleError }
}

/* -------------------------------------------------------------------------- */
/*                              Standard <img> Tag                            */
/* -------------------------------------------------------------------------- */

type FallbackImageProps = {
  className?: string
  srcList?: string[]
  alt?: string
  style?: React.CSSProperties
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  srcList = [],
  className,
  alt = 'image',
  style,
}) => {
  const { src, handleError } = useFallbackSrc(srcList)

  return (
    <img className={className} alt={alt} src={src} onError={handleError} style={style} />
  )
}

/* -------------------------------------------------------------------------- */
/*                          Next.js Legacy <Image />                          */
/* -------------------------------------------------------------------------- */

type FallbackNextLegacyImageProps = Omit<NextLegacyImageProps, 'src'> & {
  srcList?: string[]
}

export const FallbackNextLegacyImage: React.FC<FallbackNextLegacyImageProps> = ({
  srcList = [],
  alt = 'image',
  ...props
}) => {
  const { src, handleError } = useFallbackSrc(srcList)

  return <NextLegacyImage alt={alt} src={src} onError={handleError} {...props} />
}

/* -------------------------------------------------------------------------- */
/*                              Next.js <Image />                             */
/* -------------------------------------------------------------------------- */

type FallbackNextImageProps = Omit<NextImageProps, 'src'> & {
  srcList?: string[]
}

export const FallbackNextImage: React.FC<FallbackNextImageProps> = ({
  srcList = [],
  alt = 'image',
  ...props
}) => {
  const { src, handleError } = useFallbackSrc(srcList)

  return <NextImage alt={alt} src={src} onError={handleError} {...props} />
}
