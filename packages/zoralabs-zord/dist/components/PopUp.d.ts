import { Atoms } from '../atoms.css';
import { Placement } from '@popperjs/core';
import React from 'react';
export interface PopUpProps {
    trigger?: React.ReactNode;
    children?: React.ReactNode;
    wrapperClassName?: string;
    close?: boolean;
    open?: boolean;
    offsetX?: number;
    offsetY?: number;
    placement?: Placement;
    padding?: Atoms['padding'];
    triggerClassName?: string;
    onOpenChange?: (state: boolean) => void;
}
export declare function PopUp({ trigger, children, open, close, placement, padding, offsetX, offsetY, triggerClassName, onOpenChange, wrapperClassName, }: PopUpProps): JSX.Element;
//# sourceMappingURL=PopUp.d.ts.map