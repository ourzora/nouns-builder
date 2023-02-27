import { atoms } from "../atoms";
import { vars } from "../theme";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const labelVariants = {
  disabled: {
    true: {
      cursor: "not-allowed",
    },
  },
  indentFields: {
    true: {
      marginLeft: vars.space.x3,
    },
  },
};

export const textAreaField = style([{ gap: vars.space.x1 }]);

export const textAreaFieldLabel = recipe({
  base: style([
    {
      color: vars.color.secondary,
      cursor: "inherit",
    },
  ]),
  variants: labelVariants,
});

export const inputFieldWrapper = style([
  {
    width: "100%",
    position: "relative",
  },
]);

export const baseInputVariants = {
  error: {
    true: {
      bgColor: vars.color.background1,
      borderColor: vars.color.negative,
    },
  },
};

export const textAreaFieldBaseInput = recipe({
  base: style([
    {
      width: "100%",
      padding: `${vars.space.x2} ${vars.space.x3}`,
      border: "2px solid transparent",
      outline: "none",
      resize: "none",
      transition: `background-color 0.1s ${vars.ease.out}`,
      selectors: {
        "&::placeholder": {
          color: vars.color.tertiary,
        },
        "&:focus": {
          borderColor: vars.color.accent,
          backgroundColor: vars.color.background1,
          outline: "none",
        },
        "&[disabled]": {
          cursor: "not-allowed",
        },
      },
    },
    atoms({
      height: "x10",
      fontSize: 14,
      lineHeight: 24,
      fontWeight: "paragraph",
      color: "primary",
      backgroundColor: "background2",
      borderRadius: "small",
    }),
  ]),
  variants: baseInputVariants,
});
