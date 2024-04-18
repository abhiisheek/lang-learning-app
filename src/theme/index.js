import { createTheme } from "@mui/material/styles";
import { darken } from "@mui/system";

const primaryLight = "#B3D4F5";
const primaryMain = "#0071DC";
const primaryDark = "#002242";
const secondaryLight = "#909196";
const secondaryMain = "#000000";
const secondaryDark = "#2E2F32";
const errorLight = "#ef8e92";
const errorMain = "#DE1C24";
const errorDark = "#9B1419";
const black = "#000000";
const white = "#ffffff";
const gray = "#efefef";

const hoverDarkenCoefficient = 0.12;

const theme = createTheme({
  palette: {
    divider: "#D1D5DB",
    primary: {
      light: primaryLight,
      main: primaryMain,
      dark: primaryDark,
      contrastText: white,
    },
    secondary: {
      light: secondaryLight,
      main: secondaryMain,
      dark: secondaryDark,
      contrastText: black,
    },
    error: {
      light: errorLight,
      main: errorMain,
      dark: errorDark,
      contrastText: black,
    },
    colors: {
      cerulean: "#006cce",
      black: "#000000",
      black80: "rgba(0, 0, 0, 0.8)",
      eggShell: "#ffe8c6",
      wheat: "#fed08c",
      paleOrange: "#ffba54",
      goldenYellow: "#ffc220",
      white87: "rgba(255, 255, 255, 0.87)",
      white38: "rgba(255, 255, 255, 0.38)",
      white60: "rgba(255, 255, 255, 0.6)",
      lightPeach: "#f7c9c9",
      blush: "#ef9393",
      coral: "#e85d5d",
      tomato: "#e02727",
      paleAqua: "#bfedd9",
      paleTeal: "#7fdcb3",
      darkMint: "#40cb8e",
      shamrock: "#00b968",
      powderBlue: "#bfdaf3",
      lightblue: "#7fb5e6",
      black60: "rgba(0, 0, 0, 0.6)",
      black87: "rgba(0, 0, 0, 0.87)",
      black12: "rgba(0, 0, 0, 0.12)",
      white6: "rgba(255, 255, 255, 0.06)",
      blackTwo12: "rgba(37, 37, 37, 0.12)",
      lightPeach24: "rgba(247, 201, 201, 0.24)",
      powderBlue24: "rgba(191, 218, 243, 0.24)",
      darkSkyBlue: "#4091db",
      darkBlue: "#005fb5",
      red: "#d0021b",
      black38: "rgba(0, 0, 0, 0.38)",
      veryLightBlue: "#e0e6ef",
      white: "#ffffff",
      whiteTwo: "#fafafa",
      gray100: "#74767C",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: {
          textTransform: 'none',
          textDecoration: 'underline',
          "&:hover": {
            color: darken(primaryMain, hoverDarkenCoefficient),
            // backgroundColor: gray,
            background: 'none',
          },
        },
        textSecondary: {
          textTransform: 'none',
          textDecoration: 'underline',
          "&:hover": {
            color: darken(secondaryMain, hoverDarkenCoefficient),
            // backgroundColor: gray,
            background: 'none',
          },
        },
        containedPrimary: {
          textTransform: 'none',
          "&:hover": {
            backgroundColor: darken(primaryMain, hoverDarkenCoefficient),
          },
        },
        containedSecondary: {
          textTransform: 'none',
          "&:hover": {
            backgroundColor: darken(secondaryMain, hoverDarkenCoefficient),
          },
        },
        outlinedPrimary: {
          textTransform: 'none',
          border: "2px solid",
          "&:hover": {
            color: darken(primaryMain, hoverDarkenCoefficient),
            border: "2px solid",
            backgroundColor: gray,
          },
        },
        outlinedSecondary: {
          textTransform: 'none',
          border: "2px solid",
          "&:hover": {
            color: darken(secondaryMain, hoverDarkenCoefficient),
            border: "2px solid",
            backgroundColor: gray,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          "&:hover": {
            color: darken(primaryMain, hoverDarkenCoefficient),
          },
        },
        colorSecondary: {
          "&:hover": {
            color: darken(secondaryMain, hoverDarkenCoefficient),
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: [[6, 16]],
          fontSize: 14,
          lineHeight: 1.43,
          letterSpacing: 0.3,
          backgroundColor: "rgba(25, 34, 63, 0.95)",
        },
        touch: {
          padding: [[6, 16]],
          fontSize: 14,
          lineHeight: 1.43,
          letterSpacing: 0.3,
          backgroundColor: "rgba(25, 34, 63, 0.95)",
        },
        arrow: {
          color: "rgba(25, 34, 63, 0.95)",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          fontSize: 14,
          lineHeight: 1.43,
          letterSpacing: 0.3,
          backgroundColor: "rgba(25, 34, 63, 0.88)",
          borderRadius: 3,
        },
      },
    },
  },
});

export default theme;
