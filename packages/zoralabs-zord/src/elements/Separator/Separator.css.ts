import { vars } from "../../theme";
import { style } from "@vanilla-extract/css";

export const separator = style({
  backgroundColor: vars.color.background2,
  selectors: {
    "&[data-orientation=horizontal]": { height: 2, width: "100%" },
    "&[data-orientation=vertical]": { height: "100%", width: 1 },
  },
});
