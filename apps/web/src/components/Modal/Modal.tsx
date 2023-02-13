import {
  centeredModalWrapper,
  modalBackdrop,
  modalCloseButtonStyle,
  navModalWrapper,
} from './styles.css'
import { Box, Flex } from '@zoralabs/zord'
import { Icon } from 'src/components/Icon'
import React from 'react'
import { ReactNode } from 'react'
import { PortalWithState } from 'react-portal'
import { useLayoutStore } from 'src/stores/useLayoutStore'

interface Modal {
  type?: string
  children: ReactNode
  onClose?: () => void
  trigger: ReactNode
  triggerText?: string
}

const Modal: React.FC<Modal> = ({
  type,
  children,
  onClose = () => {},
  trigger,
  triggerText,
}) => {
  const { isMobile } = useLayoutStore()
  let node
  React.useEffect(() => {
    node = !!document ? document.querySelector('body') : null
  }, [])

  const handleClose = React.useCallback(
    (callbackFunc: () => void) => {
      onClose()
      callbackFunc()
    },
    [onClose]
  )

  return (
    <PortalWithState node={node} closeOnEsc onClose={() => handleClose(onClose)}>
      {({ openPortal, closePortal, portal }) => (
        <>
          {trigger === true ? (
            openPortal()
          ) : trigger ? (
            React.cloneElement(trigger as React.ReactElement<any>, {
              onClick: openPortal,
            })
          ) : (
            <button type="button" onClick={openPortal}>
              {triggerText}
            </button>
          )}
          {portal(
            <div
              id="modal-backdrop"
              className={modalBackdrop}
              style={{
                backgroundColor:
                  type === 'NAV_MENU' || 'NETWORK_MENU'
                    ? 'rgba(0,0,0,0.0)'
                    : 'rgba(0,0,0,0.3)',
              }}
              onClick={(e) => {
                if (e.target instanceof Element) {
                  e.target?.id === 'modal-backdrop' ? closePortal() : () => {}
                }
              }}
            >
              {type === 'NAV_MENU' ? (
                <Flex
                  position={'absolute'}
                  direction="column"
                  role="dialog"
                  aria-modal={true}
                  className={navModalWrapper}
                  style={{
                    top: '4.5rem',
                    left: 'calc(100% - 22rem)',
                  }}
                  onClick={(e: any) => {
                    if (e.target instanceof Element) {
                      e.target?.id.includes('close-modal') ||
                      e.target?.parentNode?.id.includes('close-modal')
                        ? closePortal()
                        : () => {}
                    }
                  }}
                >
                  {children}
                </Flex>
              ) : type === 'NETWORK_MENU' ? (
                <Flex
                  position={'absolute'}
                  direction="column"
                  role="dialog"
                  aria-modal={true}
                  p={'x2'}
                  className={navModalWrapper}
                  style={{
                    top: '13rem',
                    left: `calc(100% - ${isMobile ? '22rem' : '22rem'})`,
                  }}
                >
                  {children}
                </Flex>
              ) : (
                <Flex
                  position={'absolute'}
                  direction="column"
                  role="dialog"
                  aria-modal={true}
                  p={'x8'}
                  className={centeredModalWrapper}
                >
                  <Flex direction="row" justify="flex-end" height="x0" width="100%">
                    <Box
                      onClick={() => handleClose(closePortal)}
                      className={modalCloseButtonStyle}
                    >
                      <Icon id="cross">close</Icon>
                    </Box>
                  </Flex>
                  {children}
                </Flex>
              )}
            </div>
          )}
        </>
      )}
    </PortalWithState>
  )
}

export default Modal
