import { createTheme } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: [
      "IRYekan",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    mode: "light",
    primary: {
      main: "#2658cc",
    },
    background: {
      default: "#e3e5ea",
      paper: "#f4f2f2",
      over: "#2c2d31",
    },
    neutral: {
      main: "#ffc73f",
      contrastText: "#fff",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        fullWidth: true,
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        fullWidth: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "unset",
        },
      },
    },
  },
});

export default theme;
