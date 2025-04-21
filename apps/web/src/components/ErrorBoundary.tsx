import { Box, Text } from '@zoralabs/zord'
import React, { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode // Optional custom fallback UI
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <Box p="x4" backgroundColor="negative" borderRadius="curved">
          <Text color="onNegative" fontWeight="label">
            Something went wrong.
          </Text>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Text
              color="onNegative"
              variant="paragraph-sm"
              mt="x2"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {this.state.error.message}
            </Text>
          )}
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
