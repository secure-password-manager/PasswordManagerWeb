import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#52796F",
    },
    secondary: {
      main: "#84A98C",
    },
    background: {
      paper: "#f4f6f3",
      default: "#eff2ee",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 1201,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          size: "large",
          fontFamily: "mr-eaves-modern",
          fontWeight: 700,
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          bgcolor: "#f4f6f3",
          color: "#f4f6f3",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "mr-eaves-modern",
          fontWeight: 700,
          color: "#354F52",
          textTransform: "uppercase",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 20,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
