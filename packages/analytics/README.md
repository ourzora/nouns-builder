# Analytics

This package contains shared snippets for adding analytics to your Zora Next.js application.

## Installation

1. Install `analytics` as a workspace dependency:

```shell
pnpm -F <YOUR_APP> add analytics --workspace
```

2. Add `analytics` as a package to be transpiled in your next.config.js

```typescript
const withTM = require('next-transpile-modules')([..., 'analytics'])
```

3. Import desired analytics in the root of your application

```typescript
import { SegmentAnalytics, GoogleAnalytics, VercelAnalytics } from 'analytics'

export default MyApp() {
    <Providers>
        <SegmentAnalytics id="<SEGMENT_ID>" />
        <GoogleAnalytics id="<GOOGLE_ANALYTICS_ID>" />
        <VercelAnalytics />
    </Providers>
}

```
