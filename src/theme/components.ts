import { type Components, createTheme } from "@mui/material";
import { colors } from "./colors";

const baseTheme = createTheme();

const placeholderVisible = {
  opacity: "1 !important",
  color: colors.grey.main,
};

const components: Components = {
  MuiButton: {
    styleOverrides: {
      sizeSmall: {
        padding: "0px 16px !important",
      },
      root: {
        height: 40,
        borderRadius: 6,
        fontWeight: 600,
        width: "max-content",
        padding: "6px 16px !important",
        fontSize: 12,
        fontFamily: "Sora",
        "&$disabled": {
          color: colors.grey.ultraLight,
          backgroundColor: colors.grey.soft,
        },
        "& .MuiButton-startIcon": {
          marginRight: baseTheme.spacing(0.5),
          fontSize: 16,
        },
        "& .MuiButton-endIcon": {
          marginLeft: baseTheme.spacing(0.5),
          fontSize: 16,
        },
      },
      contained: {
        boxShadow: baseTheme.shadows[0],
        color: colors.grey.ultraLight,
        "&$disabled": {
          color: colors.grey.ultraLight,
          boxShadow: "none",
          backgroundColor: colors.grey.main,
        },
        "&:hover": {
          boxShadow: baseTheme.shadows[0],
        },
        "&:active": {
          boxShadow: baseTheme.shadows[0],
        },
        "&:focus": {
          boxShadow: baseTheme.shadows[0],
        },
      },
      outlined: {
        "&$disabled": {
          color: colors.grey.main,
          border: `1.5px solid ${colors.grey.main}`,
        },
      },
      containedPrimary: {
        color: colors.grey.ultraLight,
      },
      containedSecondary: {
        color: colors.primary.main,
      },
      startIcon: {
        marginLeft: 0,
      },
      endIcon: {
        marginRight: 0,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: "Sora",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "18px",
        letterSpacing: 0.15,
      },
      outlined: {
        position: "relative",
        textAlign: "start",
        left: "auto",
        top: "auto",
        color: colors.label.main,
        marginBottom: 8,
        marginTop: 8,
        marginLeft: 12,
        transform: "none",
        "&.MuiInputLabel-marginDense": {
          transform: "none",
        },
        "&.MuiInputLabel-shrink": {
          transform: "none",
        },
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontFamily: "Sora",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.15,
        position: "relative",
        textAlign: "start",
        left: "auto",
        top: "auto",
        color: colors.primary.main,
        marginBottom: 8,
        marginTop: 8,
        transform: "none",
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        fontFamily: "Sora",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.15,
        position: "relative",
        textAlign: "start",
        left: "auto",
        top: "auto",
        color: colors.primary.main,
        marginBottom: 8,
        marginTop: 8,
        transform: "none",
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      contained: {
        fontFamily: "Sora",
        fontSize: 10,
        fontWeight: 600,
        color: colors.grey.main,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontFamily: "Sora",
        fontSize: 12,
        fontWeight: 400,
        color: colors.notBlack.main,
        "&:not(.MuiInputBase-multiline)": {
          height: 33,
        },
      },
      input: {
        "& label[data-shrink=false] + .MuiInputBase-formControl &": {
          "&::-webkit-input-placeholder": placeholderVisible,
          "&::-moz-placeholder": placeholderVisible,
          "&:-ms-input-placeholder": placeholderVisible,
          "&::-ms-input-placeholder": placeholderVisible,
        },
      },
      inputMultiline: {
        padding: "9px 12px",
        fontFamily: "Sora",
        fontSize: 12,
      },
      notchedOutline: {
        "& > legend": {
          width: 0,
        },
        borderColor: colors.grey.main,
      },
      sizeSmall: {
        "& .MuiOutlinedInput-input": {
          paddingTop: 9,
          paddingBottom: 9,
        },
      },
    },
  },

  MuiInput: {
    styleOverrides: {
      root: {
        fontFamily: "Sora",
        fontSize: 10,
        fontWeight: 600,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "6px !important",
        borderColor: colors.grey.soft,
        borderStyle: "solid",
        borderWidth: 1,
        boxShadow: "none !important",
      },
    },
  },
};

export default components;
