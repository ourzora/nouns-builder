import { atoms } from "../atoms";
import { vars } from "../theme";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const switchWrapper = recipe({
  base: [
    style({
      width: "2.8em",
      minWidth: "2.8em",
      height: "1.6em",
      color: vars.color.tertiary,
      backgroundColor: vars.color.tertiary,
      border: `0.2em solid`,
      selectors: {
        "&:focus": { boxShadow: `0 0 0 1px currentColor` },
        '&[data-state="checked"]': {
          color: vars.color.accent,
          backgroundColor: vars.color.accent,
        },
      },
    }),
    atoms({
      borderRadius: "round",
      position: "relative",
    }),
  ],
});

export const switchThumb = recipe({
  base: [
    style({
      display: "block",
      top: 0,
      left: 0,
      width: "1.2em",
      height: "1.2em",
      backgroundColor: vars.color.background1,
      transition: "transform 100ms",
      willChange: "transform",
      selectors: {
        '&[data-state="checked"]': { transform: "translateX(100%)" },
      },
    }),
    atoms({
      borderRadius: "round",
      position: "absolute",
    }),
  ],
});
