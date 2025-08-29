import { Button, type ButtonProps, CircularProgress } from "@mui/material";

type ResendButtonProps = {
  resendDisabled: boolean;
  resendTimer: number;
  isSubmitting?: boolean;
  caption: string;
} & ButtonProps;

export function ResendEmailButton({
  resendDisabled,
  resendTimer,
  isSubmitting,
  caption,
  ...buttonProps
}: ResendButtonProps) {
  const buttonText = resendDisabled ? `Resend email in ${resendTimer}s` : isSubmitting ? "Sending..." : caption;
  const icon = isSubmitting ? <CircularProgress size={20} color="inherit" /> : null;

  return (
    <Button disabled={resendDisabled || isSubmitting} {...buttonProps} startIcon={icon} fullWidth>
      {buttonText}
    </Button>
  );
}
