/// <reference types="react" />
import * as SliderPrimitive from '@radix-ui/react-slider';
export interface SliderProps extends SliderPrimitive.SliderProps {
    range?: boolean;
    showLabel?: boolean;
    unitName?: string;
    unitNamePlural?: string;
    showInlineUnits?: boolean;
    selectedValue?: any;
}
export declare function Slider({ name, range, showLabel, showInlineUnits, unitName, unitNamePlural, selectedValue, ...props }: SliderProps): JSX.Element;
//# sourceMappingURL=Slider.d.ts.map