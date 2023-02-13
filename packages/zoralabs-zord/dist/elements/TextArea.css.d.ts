export declare const labelVariants: {
    disabled: {
        true: {
            cursor: string;
        };
    };
    indentFields: {
        true: {
            marginLeft: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
};
export declare const textAreaField: string;
export declare const textAreaFieldLabel: import("@vanilla-extract/recipes/dist/declarations/src/types").RuntimeFn<{
    disabled: {
        true: {
            cursor: string;
        };
    };
    indentFields: {
        true: {
            marginLeft: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
}>;
export declare const inputFieldWrapper: string;
export declare const baseInputVariants: {
    error: {
        true: {
            bgColor: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            borderColor: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
};
export declare const textAreaFieldBaseInput: import("@vanilla-extract/recipes/dist/declarations/src/types").RuntimeFn<{
    error: {
        true: {
            bgColor: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
            borderColor: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
}>;
//# sourceMappingURL=TextArea.css.d.ts.map