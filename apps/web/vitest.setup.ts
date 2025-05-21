import '@testing-library/jest-dom'
import '@vanilla-extract/css/disableRuntimeStyles'
import dotenv from 'dotenv'
import React from 'react'

dotenv.config({ path: '.env.testing' })

// mock window.scrollTo for framer motion
vi.stubGlobal('scrollTo', vi.fn())

// mock icons
vi.mock('src/components/Icon', () => {
  return {
    Icon: () => React.createElement('svg', { 'data-testid': 'mock-icon' }),
  }
})
