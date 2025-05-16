import type { Palette, TypographyProps } from "@mui/material";

const typography: any | ((palette: Palette) => TypographyProps) = {
  fontFamily: ["Sora"].join(","),
  h1: {
    fontFamily: "Sora",
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "0px",
  },
  h2: {
    fontFamily: "Sora",
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: "0px",
  },
  h3: {
    fontFamily: "Sora",
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: "0px",
  },
  h4: {
    fontFamily: "Sora",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0px",
  },
  h5: {
    fontFamily: "Sora",
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: "0px",
  },
  h6: {
    fontFamily: "Sora",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0px",
  },
  body1: {
    fontFamily: "Sora",
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0px",
  },
  body2: {
    fontFamily: "Sora",
    fontWeight: 400,
    fontSize: 12,
    letterSpacing: "0px",
  },
};

export default typography;
