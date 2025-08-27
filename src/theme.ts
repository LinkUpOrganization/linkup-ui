// src/theme.ts
import { createTheme } from "@mui/material/styles";

// Базова тема (можна далі кастомізувати)
const theme = createTheme({
  palette: {
    mode: "light", // або 'dark'
    primary: {
      main: "#1976d2", // синій MUI
    },
    secondary: {
      main: "#9c27b0", // фіолетовий
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
