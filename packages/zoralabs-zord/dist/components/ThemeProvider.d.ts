import { ClassValue } from 'clsx';
import { BoxProps } from '../elements';
import { PolymorphicForwardRefExoticComponent } from 'react-polymorphic-types';
import { BoxDefaultElement } from '../elements/Box';
export interface ThemeProviderProps extends BoxProps {
    theme?: ClassValue;
    baseTheme?: ClassValue;
    root?: ClassValue;
}
export declare function themeClass({ theme, baseTheme, root, }: {
    theme: ClassValue;
    baseTheme?: ClassValue;
    root?: ClassValue;
}, className?: ClassValue): string;
export declare const ThemeProvider: PolymorphicForwardRefExoticComponent<ThemeProviderProps, typeof BoxDefaultElement>;
//# sourceMappingURL=ThemeProvider.d.ts.map