import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material";

// PALETTES and COLOR
let theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#2CCA9A",
      contrastText: "#11255D",
      dark: "#f0f0f0", // hover color, 0b1941 with 6 points darker V in HSV
    },
    // dark blue
    secondary: {
      main: "#11255D",
      contrastText: "#FFFFFF",
      dark: "#0b1941", // hover color, 11255D with 6 points darker V in HSV
    },
    divider: "#EBEBEB",
  },
});

theme = createTheme(theme, {
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          marginTop: theme.spacing(1),
        },
        select: {
          minHeight: 20,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        },
      },
    },

    // MUI Input Overrides
    MuiFilledInput: {
      styleOverrides: {
        input: {
          color: theme.palette.secondary.main,
          padding: 0,
          paddingLeft: 16,
          height: 20,
        },
        root: {
          padding: 0,
          margin: theme.spacing(1),
          borderRadius: 2,
          backgroundColor: theme.palette.divider,
          height: 20,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: theme.palette.secondary.main,
          padding: 0,
          height: 54,
          borderColor: "#D9DEE5",
          borderWidth: 1,
        },
        root: {
          padding: 0,
          margin: theme.spacing(1),
          borderColor: "#D9DEE5",
          borderWidth: 1,
          borderRadius: 3.5,
          height: 54,
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "standard" },
          style: {
            backgroundColor: theme.palette.divider,
            minHeight: 28,
            borderRadius: 5,
            color: theme.palette.common.white,
            margin: theme.spacing(1),
            width: "95%",
            "& .MuiInput-root:before": {
              borderBottomWidth: 0,
            },
            "& .MuiInput-root": {
              minHeight: 28,
              color: theme.palette.secondary.main,
              paddingLeft: 16,

              fontWeight: "bold",
              "& .MuiInputAdornment-root": {
                maxHeight: 28,
              },
            },
          },
        },
      ],
    },
  },
});

export { theme };
