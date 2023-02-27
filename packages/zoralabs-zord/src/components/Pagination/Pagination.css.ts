import { atoms } from "../../atoms.css";
import { vars } from "../../theme.css";
import { media } from "../../tokens";
import { style } from "@vanilla-extract/css";

export const button = style([
  {
    width: vars.space.x10,
    height: vars.space.x10,
    "@media": {
      [media.min480]: {
        width: vars.space.x13,
        height: vars.space.x13,
        maxWidth: vars.space.x13,
      },
    },
  },
  atoms({ maxW: "x10" }),
]);

export const active = style([
  atoms({
    backgroundColor: "accent",
    color: "onAccent",
    pointerEvents: "none",
  }),
]);
