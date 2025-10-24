import { Alert, Button } from "@mui/material";

export default function EmailVerificationCall({ handleVerifyEmail }: { handleVerifyEmail: VoidFunction }) {
  return (
    <Alert
      severity="warning"
      sx={{
        mb: 3,
        "& .MuiAlert-action": {
          padding: 0,
        },
      }}
      action={
        <Button color="inherit" size="small" onClick={handleVerifyEmail} sx={{ fontWeight: "bold" }}>
          Verify
        </Button>
      }
    >
      Verify your email to access all features of our app.
    </Alert>
  );
}
