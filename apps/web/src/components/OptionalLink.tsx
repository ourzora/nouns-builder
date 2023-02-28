import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

export const OptionalLink: React.FC<
  { enabled: boolean; children: ReactNode } & LinkProps
> = ({ enabled, children, ...linkProps }) => {
  if (enabled) {
    return <Link {...linkProps}>{children}</Link>
  } else {
    return <>{children}</>
  }
}
