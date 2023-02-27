import { atoms } from "../atoms";
import { vars } from "../theme";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const radioTextVariants = {
  disabled: {
    true: [
      style({
        color: vars.color.tertiary,
        opacity: 0.6,
        selectors: {
          "&:hover": { cursor: "not-allowed !important" },
        },
      }),
    ],
  },
};

export const radioText = recipe({
  variants: radioTextVariants,

  base: [
    style({
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "auto 1fr",
      borderRadius: vars.radii.normal,
      borderWidth: vars.border.width.normal,
      borderStyle: vars.border.style.solid,
      borderColor: vars.color.secondary,
      flex: 1,
      lineHeight: 1.25,
      userSelect: "none",
      color: vars.color.primary,
      selectors: {
        "&:hover": { cursor: "pointer" },
        "&:hover:not([disabled])": {
          backgroundColor: vars.color.background2,
          borderColor: vars.color.background2,
          cursor: "pointer",
        },
      },
    }),
    atoms({
      display: "flex",
      gap: "x3",
      p: "x3",
    }),
  ],
});

export const radio = style({
  all: "unset",
  backgroundColor: vars.color.background1,
  color: vars.color.primary,
  width: vars.space.x3,
  height: vars.space.x3,
  borderRadius: vars.radii.round,
  borderWidth: vars.border.width.normal,
  borderStyle: vars.border.style.solid,
  borderColor: vars.color.secondary,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.background2,
      cursor: "pointer",
    },
    '&[data-state="checked"]': {
      borderWidth: vars.border.width.thick,
      borderColor: vars.color.accent,
      width: vars.space.x2,
      height: vars.space.x2,
    },
    '&[data-state="checked"]&:hover': {
      borderColor: vars.color.accentHover,
    },
    "&:disabled&:hover": {
      backgroundColor: vars.color.background1,
      cursor: "not-allowed",
    },
  },
});

export const indicator = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  selectors: {
    "&::after": {
      content: '""',
      display: "block",
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: vars.color.background1,
    },
    '&[data-state="checked"]&::after': {
      width: 8,
      height: 8,
    },
  },
});
