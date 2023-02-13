export declare const checkboxBase: string;
export declare const checkboxIndicator: string;
export declare const labelVariants: {
    label: {
        true: {
            padding: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    disabled: {
        true: {
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            selectors: {
                '&:hover': {
                    cursor: string;
                    backgroundColor: string;
                    color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
        };
    };
};
export declare const labelText: import("@vanilla-extract/recipes/dist/declarations/src/types").RuntimeFn<{
    label: {
        true: {
            padding: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    disabled: {
        true: {
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            selectors: {
                '&:hover': {
                    cursor: string;
                    backgroundColor: string;
                    color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
                };
            };
        };
    };
}>;
export declare const svg: string;
export declare const indeterminate: string;
//# sourceMappingURL=Checkbox.css.d.ts.map