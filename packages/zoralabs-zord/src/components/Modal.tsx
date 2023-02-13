import { Box, Icon } from '../elements'
import { ThemeProvider as ZordProvider, lightTheme } from '../index'
import { mixins } from '../mixins'
import { vars } from '../theme.css'
import * as styles from './Modal.css'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { forwardRef, ComponentProps, ReactNode } from 'react'

export interface ModalContentProps extends Dialog.DialogContentProps {
  title?: string
  showClose?: boolean
  removePadding?: boolean
  children?: ReactNode
  borderRadius?: keyof typeof vars.radii
  modalContentClassName?: string // Add className directly to the content, not the Dialog wrapper
}

export interface ModalProps extends Dialog.DialogProps {
  trigger?: ReactNode
  overlayClassName?: string
  children?: ReactNode
}

export function Modal({ overlayClassName, trigger, children, ...props }: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.DialogOverlay
          className={clsx('zord-modal-overlay', styles.overlay, overlayClassName)}
        />
        <Box key={props.open ? 'open' : 'closed'} className="zord-modal-box">
          {children}
        </Box>
      </Dialog.Portal>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
    </Dialog.Root>
  )
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (
    {
      className,
      children,
      title,
      showClose = true,
      removePadding = false,
      modalContentClassName,
      borderRadius = 'small',
      ...props
    }: ModalContentProps,
    ref
  ) => (
    <Dialog.DialogContent
      ref={ref}
      className={clsx(mixins({ center: 'xy' }), styles.content, className)}
      {...props}
    >
      <ZordProvider
        className={[
          'zord-modalcontent-provider',
          styles.background,
          !removePadding && styles.padding,
          modalContentClassName,
        ]}
        borderRadius={borderRadius}
        theme={lightTheme}
      >
        {showClose && <CloseButton />}
        {children}
      </ZordProvider>
    </Dialog.DialogContent>
  )
)

interface CloseButtonProps extends ComponentProps<typeof Dialog.Close> {}

function CloseButton({ className, ...props }: CloseButtonProps) {
  return (
    <Dialog.Close
      className={clsx(styles.close, mixins({ hoverFadeOut: true }), className)}
      {...props}
    >
      <Icon id="Close" size="md" />
    </Dialog.Close>
  )
}
