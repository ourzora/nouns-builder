import { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

export const OptionalLink: React.FC<
  { enabled: boolean; children: ReactNode } & LinkProps
> = ({ enabled, children, ...linkProps }) => {
  if (enabled) {
    return <Link {...linkProps}>{children}</Link>
  } else {
    return <>{children}</>
  }
}
