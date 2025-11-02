import type { Theme } from "@mui/material/styles";

export const getToastStyle = (theme: Theme) => ({
  background: theme.palette.toast.main,
  color: theme.palette.toast.contrastText,
  border: `1px solid ${theme.palette.toast.dark}`,
  boxShadow: "0 4px 12px rgba(255, 193, 7, 0.25)",
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  padding: "10px 16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
