import { vars } from '../theme.css';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
export interface ModalContentProps extends Dialog.DialogContentProps {
    title?: string;
    showClose?: boolean;
    removePadding?: boolean;
    children?: ReactNode;
    borderRadius?: keyof typeof vars.radii;
    modalContentClassName?: string;
}
export interface ModalProps extends Dialog.DialogProps {
    trigger?: ReactNode;
    overlayClassName?: string;
    children?: ReactNode;
}
export declare function Modal({ overlayClassName, trigger, children, ...props }: ModalProps): JSX.Element;
export declare const ModalContent: import("react").ForwardRefExoticComponent<ModalContentProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Modal.d.ts.map