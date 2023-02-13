import { BoxProps } from '..';
import { MouseEventHandler } from 'react';
export interface AccordionProps extends BoxProps {
    label?: string;
    enableDeselectAll?: Boolean;
    defaultState?: 'open' | 'closed';
    onDeselectAll?: MouseEventHandler;
}
export declare function Accordion({ defaultState, // Hack to allow AccordionItem with value="open" to be opened by default
label, enableDeselectAll, onDeselectAll, ...props }: AccordionProps): JSX.Element;
export declare function AccordionTrigger({ children, ...props }: BoxProps): JSX.Element;
export declare function AccordionContent({ children, ...props }: BoxProps): JSX.Element;
//# sourceMappingURL=Accordion.d.ts.map