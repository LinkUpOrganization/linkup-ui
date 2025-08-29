import { confirmEmail, resendVerification } from "@/api/auth";
import { ResendEmailButton } from "@/components/auth/ResendEmailButton";
import { useResendTimer } from "@/hooks/useResendTimer";
import { Alert, Box, Card, CardContent, Typography } from "@mui/material";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAuth } from "@/contexts/AuthProvider";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>): { verificationToken?: string } => {
    return {
      verificationToken: search.verificationToken as string | undefined,
    };
  },
  component: VerifyEmail,
});

function VerifyEmail() {
  const { verificationToken } = useSearch({ from: "/verify-email" });
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">(
    verificationToken ? "verifying" : "idle"
  );
  const { resendDisabled, resendTimer, startResendTimer } = useResendTimer();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    try {
      setIsResending(true);
      setSuccessMessage("");
      setErrorMessage("");
      const { success, message } = await resendVerification();
      if (success) setSuccessMessage("Code resent to your email");
      else setErrorMessage(message ?? "Failed to resend email verification. Try later");

      startResendTimer();
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (!verificationToken) return;

    const verify = async () => {
      setStatus("verifying");
      const { success, message } = await confirmEmail(verificationToken);
      if (success) {
        setStatus("success");
        setSuccessMessage("Your email is verified! You can login now");
      } else {
        setStatus("error");
        setErrorMessage(message ?? "Failed to verify. Try once again");
      }
    };

    verify();
  }, [verificationToken]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Verify Email
          </Typography>
          {successMessage && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
              {errorMessage}
            </Alert>
          )}

          {status === "verifying" && (
            <Typography align="center" color="text.secondary">
              Verifying...
            </Typography>
          )}

          {status === "idle" && (
            <Typography align="center" color="text.secondary">
              Check your inbox to verify email
            </Typography>
          )}

          {user && (
            <Box mt={3} display="flex" justifyContent="center">
              <ResendEmailButton
                resendDisabled={resendDisabled}
                resendTimer={resendTimer}
                isSubmitting={isResending}
                type="button"
                variant="contained"
                caption="Resend Email"
                onClick={handleResend}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
