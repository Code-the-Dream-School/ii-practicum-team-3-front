import { createTheme } from "@mui/material";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  palette: {
    primary: {
      main: "#1A2131", // dark navy from Figma
    },
    secondary: {
      main: "#BBF246", // bright lime from Figma
    },
    background: {
      paper: "#FFFFFF",
      default: "#FAFAFA",
    },
    accent: {
      main: "#FFD700", // star yellow
    },
    error: {
      main: "#FF3131",
    },
    footer: {
      main: "#BBF246", // footer lime from Figma
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "secondary"
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          transition: "all 0.3s",
          "&:hover": {
            opacity: 0.8
          }
        }
      }
    }
  }
});

export { baseTheme };
