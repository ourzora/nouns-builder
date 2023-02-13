import * as _vanilla_extract_sprinkles from '@vanilla-extract/sprinkles';
import { ClassValue } from 'clsx';
import * as React from 'react';
import React__default, { ReactNode, CSSProperties, ElementType, SVGProps, Dispatch, SetStateAction, MouseEventHandler } from 'react';
import { PolymorphicPropsWithRef, PolymorphicForwardRefExoticComponent } from 'react-polymorphic-types';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import * as Dialog from '@radix-ui/react-dialog';
import { Placement } from '@popperjs/core';

declare const theme: {
    fonts: {
        heading: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        body: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        mono: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    fontSizing: {
        fontSize: {
            0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            12: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            16: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            18: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            28: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            35: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            40: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            48: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            50: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            65: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            80: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            unset: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
        lineHeight: {
            0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            24: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            25: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            34: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            40: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            50: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            55: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            65: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            70: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            85: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            95: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            unset: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
        fontWeight: {
            display: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            heading: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            label: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            paragraph: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    radii: {
        tiny: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        small: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        normal: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        curved: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        phat: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        round: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    size: {
        x0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x3: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x4: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x5: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x6: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x7: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x8: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x9: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x10: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x11: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x12: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x13: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x15: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x16: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x17: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x18: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x19: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x21: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x22: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x23: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x24: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x25: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x26: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x27: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x28: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x29: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x32: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x64: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        auto: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        '100vw': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        '100vh': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        '100%': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        unset: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    space: {
        x0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x3: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x4: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x5: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x6: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x7: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x8: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x9: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x10: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x11: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x12: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x13: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x15: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x16: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x17: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x18: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x19: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x21: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x22: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x23: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x24: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x25: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x26: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x27: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x28: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x29: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x32: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x64: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        auto: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    ease: {
        in: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        out: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        inOut: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    border: {
        width: {
            none: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            thin: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            normal: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            thick: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
        style: {
            solid: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            dashed: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            dotted: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    colors: {
        backdrop: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        border: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        borderOnImage: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        background1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        background2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text3: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text4: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        icon1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        icon2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        secondary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        tertiary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        quaternary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        transparent: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accent: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accentHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accentActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accentDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onAccent: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onAccentDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positiveHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positiveActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positiveDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onPositive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onPositiveDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warningHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warningActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warningDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onWarning: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onWarningDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negative: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negativeHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negativeActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negativeDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNegative: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNegativeDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghost: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghostHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghostActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghostDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onGhost: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onGhostDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutral: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutralHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutralActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutralDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNeutral: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNeutralDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    shadows: {
        small: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        medium: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
};
declare const lightTheme: string;
declare const darkTheme: string;
declare const baseTheme: string;
declare const vars: {
    color: {
        backdrop: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        border: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        borderOnImage: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        background1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        background2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text3: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text4: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        icon1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        icon2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        secondary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        tertiary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        quaternary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        transparent: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accent: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accentHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accentActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        accentDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onAccent: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onAccentDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positiveHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positiveActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        positiveDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onPositive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onPositiveDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warningHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warningActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warningDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onWarning: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onWarningDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negative: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negativeHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negativeActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        negativeDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNegative: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNegativeDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghost: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghostHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghostActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        ghostDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onGhost: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onGhostDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutral: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutralHover: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutralActive: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        neutralDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNeutral: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        onNeutralDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    fonts: {
        heading: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        body: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        mono: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    fontSize: {
        0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        12: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        16: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        18: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        28: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        35: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        40: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        48: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        50: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        65: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        80: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        unset: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    lineHeight: {
        0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        24: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        25: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        34: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        40: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        50: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        55: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        65: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        70: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        85: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        95: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        unset: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    fontWeight: {
        display: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        heading: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        label: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        paragraph: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    radii: {
        tiny: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        small: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        normal: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        curved: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        phat: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        round: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    shadows: {
        small: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        medium: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    size: {
        x0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x3: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x4: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x5: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x6: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x7: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x8: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x9: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x10: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x11: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x12: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x13: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x15: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x16: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x17: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x18: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x19: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x21: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x22: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x23: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x24: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x25: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x26: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x27: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x28: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x29: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x32: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x64: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        auto: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        '100vw': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        '100vh': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        '100%': `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        unset: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    space: {
        x0: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x3: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x4: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x5: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x6: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x7: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x8: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x9: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x10: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x11: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x12: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x13: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x14: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x15: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x16: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x17: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x18: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x19: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x20: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x21: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x22: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x23: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x24: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x25: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x26: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x27: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x28: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x29: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x30: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x32: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        x64: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        auto: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    ease: {
        in: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        out: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        inOut: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    border: {
        width: {
            none: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            thin: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            normal: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            thick: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
        style: {
            solid: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            dashed: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            dotted: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
};
declare const root: string;

declare function colorThemeVars({ foreground, background, accent, positive, negative, warning, }: {
    foreground?: string | undefined;
    background?: string | undefined;
    accent?: string | undefined;
    positive?: string | undefined;
    negative?: string | undefined;
    warning?: string | undefined;
}): {
    background1: string;
    background2: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    icon1: string;
    icon2: string;
    border: string;
    borderOnImage: string;
    elevation1: string;
    elevation2: string;
    backdrop: string;
    accent: string;
    accentHover: string;
    accentActive: string;
    accentDisabled: string;
    onAccent: string;
    onAccentDisabled: string;
    neutral: string;
    neutralHover: string;
    neutralActive: string;
    neutralDisabled: string;
    onNeutral: string;
    onNeutralDisabled: string;
    ghost: string;
    ghostHover: string;
    ghostActive: string;
    ghostDisabled: string;
    onGhost: string;
    onGhostDisabled: string;
    positive: string;
    positiveHover: string;
    positiveActive: string;
    positiveDisabled: string;
    onPositive: string;
    onPositiveDisabled: string;
    negative: string;
    negativeHover: string;
    negativeActive: string;
    negativeDisabled: string;
    onNegative: string;
    onNegativeDisabled: string;
    warning: string;
    warningHover: string;
    warningActive: string;
    warningDisabled: string;
    onWarning: string;
    onWarningDisabled: string;
};
declare function colorTheme(colorProps: {
    [x: string]: string;
}): {
    colors: {
        backdrop: string;
        border: string;
        borderOnImage: string;
        background1: string;
        background2: string;
        text1: string;
        text2: string;
        text3: string;
        text4: string;
        transparent: string;
        icon1: string;
        icon2: string;
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
        accent: string;
        accentHover: string;
        accentActive: string;
        accentDisabled: string;
        onAccent: string;
        onAccentDisabled: string;
        positive: string;
        positiveHover: string;
        positiveActive: string;
        positiveDisabled: string;
        onPositive: string;
        onPositiveDisabled: string;
        warning: string;
        warningHover: string;
        warningActive: string;
        warningDisabled: string;
        onWarning: string;
        onWarningDisabled: string;
        negative: string;
        negativeHover: string;
        negativeActive: string;
        negativeDisabled: string;
        onNegative: string;
        onNegativeDisabled: string;
        ghost: string;
        ghostHover: string;
        ghostActive: string;
        ghostDisabled: string;
        onGhost: string;
        onGhostDisabled: string;
        neutral: string;
        neutralHover: string;
        neutralActive: string;
        neutralDisabled: string;
        onNeutral: string;
        onNeutralDisabled: string;
    };
    shadows: {
        small: string;
        medium: string;
    };
};

/**
 *  Position & transforms
 */
declare const left: {
    '50%': string;
};
declare const top: {
    '50%': string;
};
declare const translateX: {
    '-50%': string;
};
declare const translateY: {
    '-50%': string;
};
declare const translate: {
    '-50%': string;
};
declare const center: {
    x: string;
    y: string;
    xy: string;
};
/**
 *  Display
 */
declare const display: {
    none: string;
    block: string;
    inline: string;
    flex: string;
    grid: string;
    "inline-block": string;
    "inline-flex": string;
};
/**
 *  Dimensions and positioning
 */
declare const objectFit: {
    contain: string;
    cover: string;
    fill: string;
    scaleDown: string;
};
/**
 *  Pointer events
 */
declare const pointerEvents: {
    none: string;
    auto: string;
};
/**
 *  Overflow
 */
declare const overflow: {
    auto: string;
    hidden: string;
    scroll: string;
};
/**
 *  Text
 */
declare const textTransform: {
    uppercase: string;
    capitalize: string;
    none: string;
};
declare const whiteSpace: {
    nowrap: string;
};
declare const ellipsis: string;
/**
 *  Cursor
 */
declare const cursor: {
    pointer: string;
};
declare const fadeIn: {
    '0.2': string;
    '0.3': string;
    '0.4': string;
};
declare const transitionOpacity: {
    '0.2': string;
};
declare const hoverFadeOut: string;
declare const hoverFadeIn: string;
/**
 *  Debug
 */
declare const test: {
    red: string;
    blue: string;
};

declare const styles_center: typeof center;
declare const styles_cursor: typeof cursor;
declare const styles_display: typeof display;
declare const styles_ellipsis: typeof ellipsis;
declare const styles_fadeIn: typeof fadeIn;
declare const styles_hoverFadeIn: typeof hoverFadeIn;
declare const styles_hoverFadeOut: typeof hoverFadeOut;
declare const styles_left: typeof left;
declare const styles_objectFit: typeof objectFit;
declare const styles_overflow: typeof overflow;
declare const styles_pointerEvents: typeof pointerEvents;
declare const styles_test: typeof test;
declare const styles_textTransform: typeof textTransform;
declare const styles_top: typeof top;
declare const styles_transitionOpacity: typeof transitionOpacity;
declare const styles_translate: typeof translate;
declare const styles_translateX: typeof translateX;
declare const styles_translateY: typeof translateY;
declare const styles_whiteSpace: typeof whiteSpace;
declare namespace styles {
  export {
    styles_center as center,
    styles_cursor as cursor,
    styles_display as display,
    styles_ellipsis as ellipsis,
    styles_fadeIn as fadeIn,
    styles_hoverFadeIn as hoverFadeIn,
    styles_hoverFadeOut as hoverFadeOut,
    styles_left as left,
    styles_objectFit as objectFit,
    styles_overflow as overflow,
    styles_pointerEvents as pointerEvents,
    styles_test as test,
    styles_textTransform as textTransform,
    styles_top as top,
    styles_transitionOpacity as transitionOpacity,
    styles_translate as translate,
    styles_translateX as translateX,
    styles_translateY as translateY,
    styles_whiteSpace as whiteSpace,
  };
}

type Mixins = typeof styles;
type MixinsProp<M = Mixins> = {
    [P in keyof M]: Partial<keyof M[P]> | undefined | true;
};
declare function mixins(mixinsProp: Partial<MixinsProp>): string;

declare const MODAL_FOREGROUND_LAYER = 21;
declare const MODAL_BACKDROP_LAYER = 20;
declare const TOAST_LAYER = 15;
declare const HEADER_LAYER = 10;
declare const SECONDARY_LAYER = 2;
declare const PRIMARY_LAYER = 1;
declare const BASE_LAYER = 0;

declare const MAX_GRID_WIDTH = 1440;

declare const transitions: {
    in: string;
    out: string;
    inOut: string;
};

declare const atoms: ((props: {
    color?: "accent" | "positive" | "negative" | "warning" | "transparent" | "border" | "backdrop" | "borderOnImage" | "background1" | "background2" | "text1" | "text2" | "text3" | "text4" | "icon1" | "icon2" | "primary" | "secondary" | "tertiary" | "quaternary" | "accentHover" | "accentActive" | "accentDisabled" | "onAccent" | "onAccentDisabled" | "positiveHover" | "positiveActive" | "positiveDisabled" | "onPositive" | "onPositiveDisabled" | "warningHover" | "warningActive" | "warningDisabled" | "onWarning" | "onWarningDisabled" | "negativeHover" | "negativeActive" | "negativeDisabled" | "onNegative" | "onNegativeDisabled" | "ghost" | "ghostHover" | "ghostActive" | "ghostDisabled" | "onGhost" | "onGhostDisabled" | "neutral" | "neutralHover" | "neutralActive" | "neutralDisabled" | "onNeutral" | "onNeutralDisabled" | undefined;
    backgroundColor?: "accent" | "positive" | "negative" | "warning" | "transparent" | "border" | "backdrop" | "borderOnImage" | "background1" | "background2" | "text1" | "text2" | "text3" | "text4" | "icon1" | "icon2" | "primary" | "secondary" | "tertiary" | "quaternary" | "accentHover" | "accentActive" | "accentDisabled" | "onAccent" | "onAccentDisabled" | "positiveHover" | "positiveActive" | "positiveDisabled" | "onPositive" | "onPositiveDisabled" | "warningHover" | "warningActive" | "warningDisabled" | "onWarning" | "onWarningDisabled" | "negativeHover" | "negativeActive" | "negativeDisabled" | "onNegative" | "onNegativeDisabled" | "ghost" | "ghostHover" | "ghostActive" | "ghostDisabled" | "onGhost" | "onGhostDisabled" | "neutral" | "neutralHover" | "neutralActive" | "neutralDisabled" | "onNeutral" | "onNeutralDisabled" | undefined;
    borderRadius?: "tiny" | "small" | "normal" | "curved" | "phat" | "round" | undefined;
    borderColor?: "accent" | "positive" | "negative" | "warning" | "transparent" | "border" | "backdrop" | "borderOnImage" | "background1" | "background2" | "text1" | "text2" | "text3" | "text4" | "icon1" | "icon2" | "primary" | "secondary" | "tertiary" | "quaternary" | "accentHover" | "accentActive" | "accentDisabled" | "onAccent" | "onAccentDisabled" | "positiveHover" | "positiveActive" | "positiveDisabled" | "onPositive" | "onPositiveDisabled" | "warningHover" | "warningActive" | "warningDisabled" | "onWarning" | "onWarningDisabled" | "negativeHover" | "negativeActive" | "negativeDisabled" | "onNegative" | "onNegativeDisabled" | "ghost" | "ghostHover" | "ghostActive" | "ghostDisabled" | "onGhost" | "onGhostDisabled" | "neutral" | "neutralHover" | "neutralActive" | "neutralDisabled" | "onNeutral" | "onNeutralDisabled" | undefined;
    borderStyle?: "solid" | "dashed" | "dotted" | undefined;
    borderWidth?: "normal" | "none" | "thin" | "thick" | undefined;
    fontFamily?: "heading" | "body" | "mono" | undefined;
} & {
    display?: (("none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | {
        readonly '@initial'?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        readonly '@480'?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        readonly '@576'?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        readonly '@768'?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        readonly '@1024'?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        readonly '@1440'?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | null>) | undefined;
    position?: (("fixed" | "absolute" | "relative" | "sticky" | {
        readonly '@initial'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@480'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@576'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@768'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@1024'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@1440'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "fixed" | "absolute" | "relative" | "sticky" | null>) | undefined;
    alignSelf?: (("auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | {
        readonly '@initial'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@480'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@576'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@768'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@1024'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@1440'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | null>) | undefined;
    justifySelf?: (("auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | {
        readonly '@initial'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@480'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@576'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@768'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@1024'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
        readonly '@1440'?: "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "stretch" | "center" | "flex-end" | "flex-start" | "baseline" | null>) | undefined;
    flexDirection?: (("column" | "column-reverse" | "row" | "row-reverse" | {
        readonly '@initial'?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        readonly '@480'?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        readonly '@576'?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        readonly '@768'?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        readonly '@1024'?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
        readonly '@1440'?: "column" | "column-reverse" | "row" | "row-reverse" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "column" | "column-reverse" | "row" | "row-reverse" | null>) | undefined;
    justifyContent?: (("space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | {
        readonly '@initial'?: "space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | undefined;
        readonly '@480'?: "space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | undefined;
        readonly '@576'?: "space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | undefined;
        readonly '@768'?: "space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | undefined;
        readonly '@1024'?: "space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | undefined;
        readonly '@1440'?: "space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "space-around" | "space-between" | "stretch" | "center" | "flex-end" | "flex-start" | null>) | undefined;
    alignItems?: (("stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | {
        readonly '@initial'?: "stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | undefined;
        readonly '@480'?: "stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | undefined;
        readonly '@576'?: "stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | undefined;
        readonly '@768'?: "stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | undefined;
        readonly '@1024'?: "stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | undefined;
        readonly '@1440'?: "stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "stretch" | "center" | "end" | "flex-end" | "flex-start" | "start" | "baseline" | null>) | undefined;
    placeItems?: (("center" | {
        readonly '@initial'?: "center" | undefined;
        readonly '@480'?: "center" | undefined;
        readonly '@576'?: "center" | undefined;
        readonly '@768'?: "center" | undefined;
        readonly '@1024'?: "center" | undefined;
        readonly '@1440'?: "center" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "center" | null>) | undefined;
    userSelect?: (("none" | {
        readonly '@initial'?: "none" | undefined;
        readonly '@480'?: "none" | undefined;
        readonly '@576'?: "none" | undefined;
        readonly '@768'?: "none" | undefined;
        readonly '@1024'?: "none" | undefined;
        readonly '@1440'?: "none" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "none" | null>) | undefined;
    flexWrap?: (("nowrap" | "wrap" | "wrap-reverse" | {
        readonly '@initial'?: "nowrap" | "wrap" | "wrap-reverse" | undefined;
        readonly '@480'?: "nowrap" | "wrap" | "wrap-reverse" | undefined;
        readonly '@576'?: "nowrap" | "wrap" | "wrap-reverse" | undefined;
        readonly '@768'?: "nowrap" | "wrap" | "wrap-reverse" | undefined;
        readonly '@1024'?: "nowrap" | "wrap" | "wrap-reverse" | undefined;
        readonly '@1440'?: "nowrap" | "wrap" | "wrap-reverse" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "nowrap" | "wrap" | "wrap-reverse" | null>) | undefined;
    flex?: ((number | "none" | {
        readonly '@initial'?: number | "none" | undefined;
        readonly '@480'?: number | "none" | undefined;
        readonly '@576'?: number | "none" | undefined;
        readonly '@768'?: number | "none" | undefined;
        readonly '@1024'?: number | "none" | undefined;
        readonly '@1440'?: number | "none" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, number | "none" | null>) | undefined;
    flexShrink?: ((number | {
        readonly '@initial'?: number | undefined;
        readonly '@480'?: number | undefined;
        readonly '@576'?: number | undefined;
        readonly '@768'?: number | undefined;
        readonly '@1024'?: number | undefined;
        readonly '@1440'?: number | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, number | null>) | undefined;
    fontSize?: ((0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | {
        readonly '@initial'?: 0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | undefined;
        readonly '@480'?: 0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | undefined;
        readonly '@576'?: 0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | undefined;
        readonly '@768'?: 0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | undefined;
        readonly '@1024'?: 0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | undefined;
        readonly '@1440'?: 0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, 0 | "unset" | 16 | 12 | 14 | 18 | 20 | 28 | 30 | 35 | 40 | 48 | 50 | 65 | 80 | null>) | undefined;
    lineHeight?: ((0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | {
        readonly '@initial'?: 0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | undefined;
        readonly '@480'?: 0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | undefined;
        readonly '@576'?: 0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | undefined;
        readonly '@768'?: 0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | undefined;
        readonly '@1024'?: 0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | undefined;
        readonly '@1440'?: 0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, 0 | "unset" | 24 | 14 | 20 | 30 | 40 | 50 | 65 | 25 | 34 | 55 | 70 | 85 | 95 | null>) | undefined;
    fontWeight?: (("heading" | "display" | "label" | "paragraph" | {
        readonly '@initial'?: "heading" | "display" | "label" | "paragraph" | undefined;
        readonly '@480'?: "heading" | "display" | "label" | "paragraph" | undefined;
        readonly '@576'?: "heading" | "display" | "label" | "paragraph" | undefined;
        readonly '@768'?: "heading" | "display" | "label" | "paragraph" | undefined;
        readonly '@1024'?: "heading" | "display" | "label" | "paragraph" | undefined;
        readonly '@1440'?: "heading" | "display" | "label" | "paragraph" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "heading" | "display" | "label" | "paragraph" | null>) | undefined;
    textAlign?: (("left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | {
        readonly '@initial'?: "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | undefined;
        readonly '@480'?: "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | undefined;
        readonly '@576'?: "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | undefined;
        readonly '@768'?: "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | undefined;
        readonly '@1024'?: "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | undefined;
        readonly '@1440'?: "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | null>) | undefined;
    textDecoration?: (("none" | "underline" | {
        readonly '@initial'?: "none" | "underline" | undefined;
        readonly '@480'?: "none" | "underline" | undefined;
        readonly '@576'?: "none" | "underline" | undefined;
        readonly '@768'?: "none" | "underline" | undefined;
        readonly '@1024'?: "none" | "underline" | undefined;
        readonly '@1440'?: "none" | "underline" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "none" | "underline" | null>) | undefined;
    gap?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    top?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    left?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    bottom?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    right?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    paddingTop?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    paddingBottom?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    paddingLeft?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    paddingRight?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    marginTop?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    marginBottom?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    marginLeft?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    marginRight?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    width?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    height?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    minWidth?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    minHeight?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    maxWidth?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    maxHeight?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    inset?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    objectFit?: (("none" | "contain" | "fill" | "cover" | "scale-down" | {
        readonly '@initial'?: "none" | "contain" | "fill" | "cover" | "scale-down" | undefined;
        readonly '@480'?: "none" | "contain" | "fill" | "cover" | "scale-down" | undefined;
        readonly '@576'?: "none" | "contain" | "fill" | "cover" | "scale-down" | undefined;
        readonly '@768'?: "none" | "contain" | "fill" | "cover" | "scale-down" | undefined;
        readonly '@1024'?: "none" | "contain" | "fill" | "cover" | "scale-down" | undefined;
        readonly '@1440'?: "none" | "contain" | "fill" | "cover" | "scale-down" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "none" | "contain" | "fill" | "cover" | "scale-down" | null>) | undefined;
    overflow?: (("auto" | "hidden" | "visible" | "scroll" | {
        readonly '@initial'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@480'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@576'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@768'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@1024'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@1440'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "hidden" | "visible" | "scroll" | null>) | undefined;
    overflowY?: (("auto" | "hidden" | "visible" | "scroll" | {
        readonly '@initial'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@480'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@576'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@768'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@1024'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@1440'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "hidden" | "visible" | "scroll" | null>) | undefined;
    overflowX?: (("auto" | "hidden" | "visible" | "scroll" | {
        readonly '@initial'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@480'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@576'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@768'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@1024'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
        readonly '@1440'?: "auto" | "hidden" | "visible" | "scroll" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "hidden" | "visible" | "scroll" | null>) | undefined;
    pointerEvents?: (("auto" | "none" | "all" | "initial" | {
        readonly '@initial'?: "auto" | "none" | "all" | "initial" | undefined;
        readonly '@480'?: "auto" | "none" | "all" | "initial" | undefined;
        readonly '@576'?: "auto" | "none" | "all" | "initial" | undefined;
        readonly '@768'?: "auto" | "none" | "all" | "initial" | undefined;
        readonly '@1024'?: "auto" | "none" | "all" | "initial" | undefined;
        readonly '@1440'?: "auto" | "none" | "all" | "initial" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "none" | "all" | "initial" | null>) | undefined;
    textTransform?: (("none" | "capitalize" | "lowercase" | "uppercase" | {
        readonly '@initial'?: "none" | "capitalize" | "lowercase" | "uppercase" | undefined;
        readonly '@480'?: "none" | "capitalize" | "lowercase" | "uppercase" | undefined;
        readonly '@576'?: "none" | "capitalize" | "lowercase" | "uppercase" | undefined;
        readonly '@768'?: "none" | "capitalize" | "lowercase" | "uppercase" | undefined;
        readonly '@1024'?: "none" | "capitalize" | "lowercase" | "uppercase" | undefined;
        readonly '@1440'?: "none" | "capitalize" | "lowercase" | "uppercase" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "none" | "capitalize" | "lowercase" | "uppercase" | null>) | undefined;
    boxShadow?: (("small" | "medium" | {
        readonly '@initial'?: "small" | "medium" | undefined;
        readonly '@480'?: "small" | "medium" | undefined;
        readonly '@576'?: "small" | "medium" | undefined;
        readonly '@768'?: "small" | "medium" | undefined;
        readonly '@1024'?: "small" | "medium" | undefined;
        readonly '@1440'?: "small" | "medium" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "small" | "medium" | null>) | undefined;
    cursor?: (("auto" | "not-allowed" | "pointer" | {
        readonly '@initial'?: "auto" | "not-allowed" | "pointer" | undefined;
        readonly '@480'?: "auto" | "not-allowed" | "pointer" | undefined;
        readonly '@576'?: "auto" | "not-allowed" | "pointer" | undefined;
        readonly '@768'?: "auto" | "not-allowed" | "pointer" | undefined;
        readonly '@1024'?: "auto" | "not-allowed" | "pointer" | undefined;
        readonly '@1440'?: "auto" | "not-allowed" | "pointer" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "not-allowed" | "pointer" | null>) | undefined;
    backgroundSize?: (("auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | {
        readonly '@initial'?: "auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | undefined;
        readonly '@480'?: "auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | undefined;
        readonly '@576'?: "auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | undefined;
        readonly '@768'?: "auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | undefined;
        readonly '@1024'?: "auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | undefined;
        readonly '@1440'?: "auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "unset" | "contain" | "inherit" | "initial" | "revert" | "cover" | null>) | undefined;
    gridAutoRows?: (("auto" | {
        readonly '@initial'?: "auto" | undefined;
        readonly '@480'?: "auto" | undefined;
        readonly '@576'?: "auto" | undefined;
        readonly '@768'?: "auto" | undefined;
        readonly '@1024'?: "auto" | undefined;
        readonly '@1440'?: "auto" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | null>) | undefined;
    gridAutoColumns?: (("auto" | {
        readonly '@initial'?: "auto" | undefined;
        readonly '@480'?: "auto" | undefined;
        readonly '@576'?: "auto" | undefined;
        readonly '@768'?: "auto" | undefined;
        readonly '@1024'?: "auto" | undefined;
        readonly '@1440'?: "auto" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | null>) | undefined;
    wordBreak?: (("normal" | "break-word" | "break-all" | "keep-all" | {
        readonly '@initial'?: "normal" | "break-word" | "break-all" | "keep-all" | undefined;
        readonly '@480'?: "normal" | "break-word" | "break-all" | "keep-all" | undefined;
        readonly '@576'?: "normal" | "break-word" | "break-all" | "keep-all" | undefined;
        readonly '@768'?: "normal" | "break-word" | "break-all" | "keep-all" | undefined;
        readonly '@1024'?: "normal" | "break-word" | "break-all" | "keep-all" | undefined;
        readonly '@1440'?: "normal" | "break-word" | "break-all" | "keep-all" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "normal" | "break-word" | "break-all" | "keep-all" | null>) | undefined;
    listStyle?: (("none" | {
        readonly '@initial'?: "none" | undefined;
        readonly '@480'?: "none" | undefined;
        readonly '@576'?: "none" | undefined;
        readonly '@768'?: "none" | undefined;
        readonly '@1024'?: "none" | undefined;
        readonly '@1440'?: "none" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "none" | null>) | undefined;
    whiteSpace?: (("unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | {
        readonly '@initial'?: "unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | undefined;
        readonly '@480'?: "unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | undefined;
        readonly '@576'?: "unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | undefined;
        readonly '@768'?: "unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | undefined;
        readonly '@1024'?: "unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | undefined;
        readonly '@1440'?: "unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "unset" | "normal" | "inherit" | "revert" | "nowrap" | "break-spaces" | "pre" | "pre-line" | "pre-wrap" | null>) | undefined;
    minW?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    minH?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    maxW?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    maxH?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    margin?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    m?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    mx?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    my?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    mt?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    mb?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    ml?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    mr?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    pos?: (("fixed" | "absolute" | "relative" | "sticky" | {
        readonly '@initial'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@480'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@576'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@768'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@1024'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        readonly '@1440'?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "fixed" | "absolute" | "relative" | "sticky" | null>) | undefined;
    padding?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    p?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    px?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    py?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    pt?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    pb?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    pl?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    pr?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    shadow?: (("small" | "medium" | {
        readonly '@initial'?: "small" | "medium" | undefined;
        readonly '@480'?: "small" | "medium" | undefined;
        readonly '@576'?: "small" | "medium" | undefined;
        readonly '@768'?: "small" | "medium" | undefined;
        readonly '@1024'?: "small" | "medium" | undefined;
        readonly '@1440'?: "small" | "medium" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "small" | "medium" | null>) | undefined;
    w?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    h?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    t?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    l?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    b?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    r?: (("auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
    size?: (("auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | {
        readonly '@initial'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@480'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@576'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@768'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1024'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
        readonly '@1440'?: "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | undefined;
    }) | _vanilla_extract_sprinkles.ResponsiveArray<2 | 1 | 3 | 4 | 5 | 6, "auto" | "100vw" | "100vh" | "100%" | "unset" | "x0" | "x1" | "x2" | "x3" | "x4" | "x5" | "x6" | "x7" | "x8" | "x9" | "x10" | "x11" | "x12" | "x13" | "x14" | "x15" | "x16" | "x17" | "x18" | "x19" | "x20" | "x21" | "x22" | "x23" | "x24" | "x25" | "x26" | "x27" | "x28" | "x29" | "x30" | "x32" | "x64" | null>) | undefined;
}) => string) & {
    properties: Set<"r" | "b" | "fontSize" | "lineHeight" | "fontWeight" | "display" | "size" | "width" | "color" | "backgroundColor" | "alignItems" | "alignSelf" | "backgroundSize" | "bottom" | "boxShadow" | "cursor" | "flexDirection" | "flexShrink" | "flexWrap" | "fontFamily" | "gridAutoColumns" | "gridAutoRows" | "height" | "inset" | "justifyContent" | "justifySelf" | "left" | "marginBottom" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "objectFit" | "overflowX" | "overflowY" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop" | "pointerEvents" | "position" | "right" | "textAlign" | "textTransform" | "top" | "userSelect" | "whiteSpace" | "wordBreak" | "borderColor" | "borderRadius" | "borderStyle" | "borderWidth" | "flex" | "gap" | "listStyle" | "margin" | "overflow" | "padding" | "placeItems" | "textDecoration" | "minW" | "minH" | "maxW" | "maxH" | "m" | "mx" | "my" | "mt" | "mb" | "ml" | "mr" | "pos" | "p" | "px" | "py" | "pt" | "pb" | "pl" | "pr" | "shadow" | "w" | "h" | "t" | "l">;
};
type Atoms = Parameters<typeof atoms>[0];

interface BoxProps {
    className?: ClassValue;
    children?: ReactNode;
    style?: CSSProperties;
    aspectRatio?: React__default.CSSProperties['aspectRatio'] | number;
    center?: MixinsProp['center'];
    display?: Atoms['display'];
    flex?: Atoms['flex'];
    flexShrink?: Atoms['flexShrink'];
    alignSelf?: Atoms['alignSelf'];
    justifySelf?: Atoms['justifySelf'];
    color?: Atoms['color'];
    cursor?: Atoms['cursor'];
    borderColor?: Atoms['borderColor'];
    borderStyle?: Atoms['borderStyle'];
    borderWidth?: Atoms['borderWidth'];
    backgroundColor?: Atoms['backgroundColor'];
    borderRadius?: Atoms['borderRadius'];
    fontFamily?: Atoms['fontFamily'];
    fontSize?: Atoms['fontSize'];
    fontWeight?: Atoms['fontWeight'];
    lineHeight?: Atoms['lineHeight'];
    objectFit?: Atoms['objectFit'];
    position?: Atoms['position'];
    pos?: Atoms['pos'];
    p?: Atoms['p'];
    px?: Atoms['px'];
    py?: Atoms['py'];
    pt?: Atoms['pt'];
    pr?: Atoms['pr'];
    pb?: Atoms['pb'];
    pl?: Atoms['pl'];
    m?: Atoms['m'];
    mx?: Atoms['mx'];
    my?: Atoms['my'];
    mt?: Atoms['mt'];
    mr?: Atoms['mr'];
    mb?: Atoms['mb'];
    ml?: Atoms['ml'];
    top?: Atoms['top'];
    right?: Atoms['right'];
    bottom?: Atoms['bottom'];
    left?: Atoms['left'];
    w?: Atoms['width'];
    h?: Atoms['height'];
    width?: Atoms['width'];
    height?: Atoms['height'];
    textAlign?: Atoms['textAlign'];
    minW?: Atoms['minW'];
    minH?: Atoms['minH'];
    maxW?: Atoms['maxW'];
    maxH?: Atoms['maxH'];
    listStyle?: Atoms['listStyle'];
    inset?: Atoms['inset'];
    overflow?: Atoms['overflow'];
    overflowX?: Atoms['overflowX'];
    overflowY?: Atoms['overflowY'];
    pointerEvents?: Atoms['pointerEvents'];
    wordBreak?: Atoms['wordBreak'];
    id?: string;
}
declare const BoxDefaultElement = "div";
type BoxComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<BoxProps, E>;
declare const Box: PolymorphicForwardRefExoticComponent<BoxProps, typeof BoxDefaultElement>;

declare const iconVariants: {
    color: {
        primary: string[];
    };
    size: {
        sm: {
            width: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            height: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
        md: {
            width: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            height: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
        lg: {
            width: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            height: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
        xl: {
            width: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            height: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    flip: {
        true: string[];
    };
    rotate: {
        true: string[];
    };
};

interface ButtonProps extends FlexProps {
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'positive' | 'destructive' | 'outline' | 'circle' | 'circleSolid' | 'ghost' | 'unset';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: IconProps['id'];
    iconAlign?: 'left' | 'right';
    type?: 'submit' | 'reset' | 'button';
    iconSize?: keyof typeof iconVariants['size'];
    loading?: boolean;
    pill?: boolean;
}
declare const ButtonDefaultElement = "button";
declare const Button: PolymorphicForwardRefExoticComponent<ButtonProps, typeof ButtonDefaultElement>;

interface GridProps extends BoxProps {
    gap?: Atoms['gap'];
    align?: Atoms['alignItems'];
    justify?: Atoms['justifyContent'];
    columns?: React__default.CSSProperties['gridTemplateColumns'] | 'auto';
    rows?: React__default.CSSProperties['gridTemplateRows'] | 'auto';
    autoRows?: Atoms['gridAutoRows'] | true;
    autoColumns?: Atoms['gridAutoColumns'] | true;
}
declare const Grid: PolymorphicForwardRefExoticComponent<GridProps, typeof BoxDefaultElement>;

interface FlexProps extends BoxProps {
    alignSelf?: Atoms['alignSelf'];
    gap?: Atoms['gap'];
    wrap?: Atoms['flexWrap'] | boolean;
    direction?: Atoms['flexDirection'];
    align?: Atoms['alignItems'];
    justify?: Atoms['justifyContent'];
    placeItems?: Atoms['placeItems'];
    flexChildren?: boolean;
}
type FlexComponentProps<E extends React__default.ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<FlexProps, E>;
declare const Flex: PolymorphicForwardRefExoticComponent<FlexProps, typeof BoxDefaultElement>;

interface StackProps extends FlexProps {
}
declare const Stack: PolymorphicForwardRefExoticComponent<StackProps, typeof BoxDefaultElement>;

declare const textVariants: {
    readonly italic: {
        readonly true: {
            readonly fontStyle: "italic";
        };
    };
    readonly variant: {
        readonly code: string;
        readonly eyebrow: string;
        readonly 'heading-xs': string;
        readonly 'heading-sm': string;
        readonly 'heading-md': string;
        readonly 'heading-lg': string;
        readonly 'heading-xl': string;
        readonly 'label-xs': string;
        readonly 'label-sm': string;
        readonly 'label-md': string;
        readonly 'label-lg': string;
        readonly 'menu-lg': string;
        readonly 'paragraph-xs': string;
        readonly 'paragraph-sm': string;
        readonly 'paragraph-md': string;
        readonly 'paragraph-lg': string;
        readonly 'display-xs': string;
        readonly 'display-sm': string;
        readonly 'display-md': string;
        readonly 'display-lg': string;
        readonly link: string;
    };
};

interface TextProps extends BoxProps {
    align?: Atoms['textAlign'];
    inline?: boolean;
    italic?: boolean;
    textTransform?: Atoms['textTransform'];
    variant?: keyof typeof textVariants['variant'];
}
declare const Text: PolymorphicForwardRefExoticComponent<TextProps, typeof BoxDefaultElement>;
interface ParagraphProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
type ParagraphComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<ParagraphProps, E>;
declare function Paragraph<E extends ElementType = typeof BoxDefaultElement>({ size, variant, ...props }: ParagraphComponentProps<E>): JSX.Element;
interface HeadingProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
type HeadingComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<HeadingProps, E>;
declare function Heading<E extends ElementType = typeof BoxDefaultElement>({ size, variant, ...props }: HeadingComponentProps<E>): JSX.Element;
interface DisplayProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
type DisplayComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<DisplayProps, E>;
declare function Display<E extends ElementType = typeof BoxDefaultElement>({ size, variant, ...props }: DisplayComponentProps<E>): JSX.Element;
interface EyebrowProps extends Omit<TextProps, 'variant'> {
}
type EyebrowComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<EyebrowProps, E>;
declare function Eyebrow<E extends ElementType = typeof BoxDefaultElement>({ variant, ...props }: EyebrowComponentProps<E>): JSX.Element;
interface LabelProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
type LabelComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<LabelProps, E>;
declare function Label<E extends ElementType = typeof BoxDefaultElement>({ size, ...props }: LabelComponentProps<E>): JSX.Element;
interface MenuProps extends TextProps {
}
type MenuTextComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<MenuProps, E>;
declare function MenuText<E extends ElementType = typeof BoxDefaultElement>({ ...props }: MenuTextComponentProps<E>): JSX.Element;

declare const SvgArrowRightAngle: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgArrowRight: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgAuction: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgAudio: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgBell: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgCheck: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronDown: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronLeft: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronRight: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronUp: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgClose: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgCoinbase: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgCopy: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgCreate: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgDiscord: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgDownload: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgEllipsis: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgEmbed: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgFile: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgInstagram: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgKebab: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgLogout: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgMetamask: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgPencil: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgPlus: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgQuestion: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgRainbow: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgSearch: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgShield: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgSpinner: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgTag: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgTwitter: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgVideo: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgWalletConnect: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgWarning: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare namespace iconComponents {
  export {
    SvgArrowRight as ArrowRight,
    SvgArrowRightAngle as ArrowRightAngle,
    SvgAuction as Auction,
    SvgAudio as Audio,
    SvgBell as Bell,
    SvgCheck as Check,
    SvgChevronDown as ChevronDown,
    SvgChevronLeft as ChevronLeft,
    SvgChevronRight as ChevronRight,
    SvgChevronUp as ChevronUp,
    SvgClose as Close,
    SvgCoinbase as Coinbase,
    SvgCopy as Copy,
    SvgCreate as Create,
    SvgDiscord as Discord,
    SvgDownload as Download,
    SvgEllipsis as Ellipsis,
    SvgEmbed as Embed,
    SvgFile as File,
    SvgInstagram as Instagram,
    SvgKebab as Kebab,
    SvgLogout as Logout,
    SvgMetamask as Metamask,
    SvgPencil as Pencil,
    SvgPlus as Plus,
    SvgQuestion as Question,
    SvgRainbow as Rainbow,
    SvgSearch as Search,
    SvgShield as Shield,
    SvgSpinner as Spinner,
    SvgTag as Tag,
    SvgTwitter as Twitter,
    SvgVideo as Video,
    SvgWalletConnect as WalletConnect,
    SvgWarning as Warning,
  };
}

type IconType = keyof typeof iconComponents;
declare const icons: ("ArrowRightAngle" | "ArrowRight" | "Auction" | "Audio" | "Bell" | "Check" | "ChevronDown" | "ChevronLeft" | "ChevronRight" | "ChevronUp" | "Close" | "Coinbase" | "Copy" | "Create" | "Discord" | "Download" | "Ellipsis" | "Embed" | "File" | "Instagram" | "Kebab" | "Logout" | "Metamask" | "Pencil" | "Plus" | "Question" | "Rainbow" | "Search" | "Shield" | "Spinner" | "Tag" | "Twitter" | "Video" | "WalletConnect" | "Warning")[];
interface IconProps extends FlexProps {
    id?: IconType;
    flip?: boolean;
    size?: keyof typeof iconVariants['size'];
}
declare function Icon({ id, size, flip, ...props }: IconProps): JSX.Element;

interface SpinnerProps extends IconProps {
}
declare function Spinner({ ...props }: SpinnerProps): JSX.Element;

declare const inputVariants: {
    sizeVariant: {
        lg: {}[];
        sm: (string | {
            paddingTop: number;
            paddingBottom: number;
        })[];
    };
};

interface InputProps extends BoxProps {
    size?: keyof typeof inputVariants['sizeVariant'];
}
type InputComponentProps<E extends ElementType> = PolymorphicPropsWithRef<InputProps, E>;
declare const Input: PolymorphicForwardRefExoticComponent<InputProps, 'input'>;

interface InputFieldProps extends BoxComponentProps<'input'> {
    name: string;
    value?: string | number;
    placeholder?: string;
    label?: string;
    affix?: string;
    type?: 'text' | 'number';
    step?: number;
    min?: number;
    max?: number;
    icon?: IconProps['id'];
    className?: string;
    disabled?: boolean;
    indentFields?: boolean;
    error?: string;
    canError?: boolean;
    description?: string;
    descriptionVariant?: keyof typeof textVariants['variant'];
    lowProfile?: boolean;
    headerElement?: React__default.ReactNode;
    affixElement?: React__default.ReactNode;
    variant?: 'sm' | 'lg';
    inlineButton?: React__default.ReactNode;
    disableWheelEvent?: boolean;
}
declare const InputField: PolymorphicForwardRefExoticComponent<InputFieldProps, 'input'>;

declare const inputField: string;
declare const inputFieldBaseInput: string;
declare const inputContainer: string;

interface TextAreaProps extends BoxComponentProps<'textarea'> {
    value?: string;
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    initialHeight?: number;
    disabled?: boolean;
    indentFields?: boolean;
    error?: string;
    description?: string;
    style?: {
        [key: string]: number | string;
    };
}
declare function TextArea({ value, label, name, description, error, className, style, placeholder, disabled, indentFields, initialHeight, ...props }: TextAreaProps): JSX.Element;

interface SelectProps extends FlexComponentProps<'select'> {
    autoFocus?: boolean;
    containerClassName?: ClassValue;
    defaultValue?: string;
    name?: string;
    onChange?: (e: React__default.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React__default.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (e: React__default.FocusEvent<HTMLSelectElement>) => void;
    variant?: 'sm' | 'lg';
    disabled?: boolean;
    value?: string | number;
}
declare const Select: ({ className, containerClassName, variant, children, disabled, ...props }: SelectProps) => JSX.Element;

interface SliderProps extends SliderPrimitive.SliderProps {
    range?: boolean;
    showLabel?: boolean;
    unitName?: string;
    unitNamePlural?: string;
    showInlineUnits?: boolean;
    selectedValue?: any;
}
declare function Slider({ name, range, showLabel, showInlineUnits, unitName, unitNamePlural, selectedValue, ...props }: SliderProps): JSX.Element;

interface TagProps extends TextProps {
    active?: boolean;
    inactive?: boolean;
    showDot?: boolean;
}
declare function Tag({ active, className, children, inactive, showDot, ...props }: TagProps): JSX.Element;

interface CheckboxProps {
    label?: string;
    name: string;
    id: string;
    checked?: CheckboxPrimitive.CheckedState | boolean;
    className?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: Dispatch<SetStateAction<CheckboxPrimitive.CheckedState>>;
    onClick?: () => void;
}
declare function Checkbox({ label, id, name, className, checked, defaultChecked, disabled, onClick, onChange, ...props }: CheckboxProps): JSX.Element;

interface SwitchProps {
    id?: string;
    value?: string;
    label?: string;
    textVariant?: keyof typeof textVariants['variant'];
    description?: string | ReactNode;
    descriptionVariant?: keyof typeof textVariants['variant'];
    disabled?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: () => void;
}
declare function Switch({ id, value, label, description, descriptionVariant, defaultChecked, checked, disabled, onChange, textVariant, }: SwitchProps): JSX.Element;

interface RadioButtonGroupProps extends RadioGroupProps {
    items: Omit<RadioButtonProps, 'id'>[];
    buttonClassName?: ClassValue;
}
interface RadioButtonProps {
    id: string;
    value: string;
    label?: string;
    disabled?: boolean;
}
declare function RadioButtonGroup({ className, buttonClassName, items, ...props }: RadioButtonGroupProps): JSX.Element;

/**
 * Ported from radix-ui
 * https://github.com/radix-ui/primitives/blob/main/packages/react/separator/src/Separator.tsx
 */

declare const ORIENTATIONS: readonly ["horizontal", "vertical"];
type Orientation = typeof ORIENTATIONS[number];
interface SeparatorProps extends BoxProps {
    orientation?: Orientation;
    decorative?: boolean;
}
type SeparatorComponentProps<E extends ElementType> = PolymorphicPropsWithRef<SeparatorProps, E>;
declare function Separator<E extends ElementType>({ orientation, decorative, ...props }: SeparatorComponentProps<E>): JSX.Element;

interface AccordionProps extends BoxProps {
    label?: string;
    enableDeselectAll?: Boolean;
    defaultState?: 'open' | 'closed';
    onDeselectAll?: MouseEventHandler;
}
declare function Accordion({ defaultState, // Hack to allow AccordionItem with value="open" to be opened by default
label, enableDeselectAll, onDeselectAll, ...props }: AccordionProps): JSX.Element;

interface ModalContentProps extends Dialog.DialogContentProps {
    title?: string;
    showClose?: boolean;
    removePadding?: boolean;
    children?: ReactNode;
    borderRadius?: keyof typeof vars.radii;
    modalContentClassName?: string;
}
interface ModalProps extends Dialog.DialogProps {
    trigger?: ReactNode;
    overlayClassName?: string;
    children?: ReactNode;
}
declare function Modal({ overlayClassName, trigger, children, ...props }: ModalProps): JSX.Element;
declare const ModalContent: React.ForwardRefExoticComponent<ModalContentProps & React.RefAttributes<HTMLDivElement>>;

interface WellProps extends StackProps {
    label?: string;
}
declare function Well({ label, className, children, ...props }: WellProps): JSX.Element;

/**
 * Pagination component
 * - Pass PaginationProximityList as a child to render a the pagination buttons
 */
interface PaginationProps extends FlexProps {
    isFirst: boolean;
    isLast: boolean;
    onNext: () => void;
    onPrevious: () => void;
    totalPages: number;
}
declare function Pagination({ children, isFirst, isLast, onNext, onPrevious, totalPages, ...props }: PaginationProps): JSX.Element | null;

/**
 * List of pagination numbers, with ellipsis indicators
 */
interface PaginationProximityListProps {
    index: number;
    items: number[];
    setIndex: (index: number) => void;
    totalPages: number;
}
declare function PaginationProximityList({ index, items, setIndex, totalPages, }: PaginationProximityListProps): JSX.Element | null;

interface PopUpProps {
    trigger?: React__default.ReactNode;
    children?: React__default.ReactNode;
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
declare function PopUp({ trigger, children, open, close, placement, padding, offsetX, offsetY, triggerClassName, onOpenChange, wrapperClassName, }: PopUpProps): JSX.Element;

interface SpinnerOGProps {
    size?: number | string;
    className?: string;
}
declare function SpinnerOG({ size, className }: SpinnerOGProps): JSX.Element;

interface ThemeProviderProps extends BoxProps {
    theme?: ClassValue;
    baseTheme?: ClassValue;
    root?: ClassValue;
}
declare function themeClass({ theme, baseTheme, root, }: {
    theme: ClassValue;
    baseTheme?: ClassValue;
    root?: ClassValue;
}, className?: ClassValue): string;
declare const ThemeProvider: PolymorphicForwardRefExoticComponent<ThemeProviderProps, typeof BoxDefaultElement>;

declare const color: {
    background1: string;
    background2: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    icon1: string;
    icon2: string;
    border: string;
    borderOnImage: string;
    elevation1: string;
    elevation2: string;
    backdrop: string;
    accent: string;
    accentHover: string;
    accentActive: string;
    accentDisabled: string;
    onAccent: string;
    onAccentDisabled: string;
    neutral: string;
    neutralHover: string;
    neutralActive: string;
    neutralDisabled: string;
    onNeutral: string;
    onNeutralDisabled: string;
    ghost: string;
    ghostHover: string;
    ghostActive: string;
    ghostDisabled: string;
    onGhost: string;
    onGhostDisabled: string;
    positive: string;
    positiveHover: string;
    positiveActive: string;
    positiveDisabled: string;
    onPositive: string;
    onPositiveDisabled: string;
    negative: string;
    negativeHover: string;
    negativeActive: string;
    negativeDisabled: string;
    onNegative: string;
    onNegativeDisabled: string;
    warning: string;
    warningHover: string;
    warningActive: string;
    warningDisabled: string;
    onWarning: string;
    onWarningDisabled: string;
};

declare const space: {
    x0: string;
    x1: string;
    x2: string;
    x3: string;
    x4: string;
    x5: string;
    x6: string;
    x7: string;
    x8: string;
    x9: string;
    x10: string;
    x11: string;
    x12: string;
    x13: string;
    x14: string;
    x15: string;
    x16: string;
    x17: string;
    x18: string;
    x19: string;
    x20: string;
    x21: string;
    x22: string;
    x23: string;
    x24: string;
    x25: string;
    x26: string;
    x27: string;
    x28: string;
    x29: string;
    x30: string;
    x32: string;
    x64: string;
    auto: string;
};
declare const size: {
    readonly '100vw': "100vw";
    readonly '100vh': "100vh";
    readonly '100%': "100%";
    readonly unset: "unset";
    readonly x0: string;
    readonly x1: string;
    readonly x2: string;
    readonly x3: string;
    readonly x4: string;
    readonly x5: string;
    readonly x6: string;
    readonly x7: string;
    readonly x8: string;
    readonly x9: string;
    readonly x10: string;
    readonly x11: string;
    readonly x12: string;
    readonly x13: string;
    readonly x14: string;
    readonly x15: string;
    readonly x16: string;
    readonly x17: string;
    readonly x18: string;
    readonly x19: string;
    readonly x20: string;
    readonly x21: string;
    readonly x22: string;
    readonly x23: string;
    readonly x24: string;
    readonly x25: string;
    readonly x26: string;
    readonly x27: string;
    readonly x28: string;
    readonly x29: string;
    readonly x30: string;
    readonly x32: string;
    readonly x64: string;
    readonly auto: string;
};

declare const breakpoints: number[];
declare const media: {
    [k: string]: string;
};
declare const themeBreakpoints: {
    [k: string]: {
        '@media': string;
    };
};

declare const radii: {
    readonly tiny: "2px";
    readonly small: "4px";
    readonly normal: "5px";
    readonly curved: "10px";
    readonly phat: "20px";
    readonly round: "9999px";
};

declare const border: {
    style: {
        solid: string;
        dashed: string;
        dotted: string;
    };
    width: {
        none: string;
        thin: string;
        normal: string;
        thick: string;
    };
};

declare const ease: {
    in: string;
    out: string;
    inOut: string;
};

declare const fonts: {
    heading: string;
    body: string;
    mono: string;
};
declare const fontSize: {
    0: string;
    12: string;
    14: string;
    16: string;
    18: string;
    20: string;
    28: string;
    30: string;
    35: string;
    40: string;
    48: string;
    50: string;
    65: string;
    80: string;
    unset: string;
};
declare const lineHeight: {
    0: string;
    14: string;
    20: string;
    24: string;
    25: string;
    30: string;
    34: string;
    40: string;
    50: string;
    55: string;
    65: string;
    70: string;
    85: string;
    95: string;
    unset: string;
};
declare const fontWeight: {
    paragraph: string;
    heading: string;
    label: string;
    display: string;
};

declare const typography_fontSize: typeof fontSize;
declare const typography_fontWeight: typeof fontWeight;
declare const typography_fonts: typeof fonts;
declare const typography_lineHeight: typeof lineHeight;
declare namespace typography {
  export {
    typography_fontSize as fontSize,
    typography_fontWeight as fontWeight,
    typography_fonts as fonts,
    typography_lineHeight as lineHeight,
  };
}

export { Accordion, AccordionProps, Atoms, BASE_LAYER, Box, BoxComponentProps, BoxProps, Button, ButtonProps, Checkbox, CheckboxProps, Display, DisplayProps, Eyebrow, EyebrowProps, Flex, FlexProps, Grid, GridProps, HEADER_LAYER, Heading, HeadingProps, Icon, IconProps, IconType, Input, InputComponentProps, InputField, InputFieldProps, InputProps, Label, LabelProps, MAX_GRID_WIDTH, MODAL_BACKDROP_LAYER, MODAL_FOREGROUND_LAYER, MenuProps, MenuText, Mixins, MixinsProp, Modal, ModalContent, ModalProps, PRIMARY_LAYER, Pagination, PaginationProps, PaginationProximityList, PaginationProximityListProps, Paragraph, ParagraphProps, PopUp, PopUpProps, RadioButtonGroup, RadioButtonProps, SECONDARY_LAYER, Select, SelectProps, Separator, SeparatorProps, Slider, SliderProps, Spinner, SpinnerOG, SpinnerOGProps, SpinnerProps, Stack, StackProps, Switch, SwitchProps, TOAST_LAYER, Tag, TagProps, Text, TextArea, TextAreaProps, TextProps, ThemeProvider, ThemeProviderProps, Well, WellProps, atoms, baseTheme, border, breakpoints, color, colorTheme, colorThemeVars, darkTheme, ease, icons, inputContainer, inputField, inputFieldBaseInput, lightTheme, media, mixins, radii, root, size, space, textVariants, theme, themeBreakpoints, themeClass, transitions, typography, vars };
