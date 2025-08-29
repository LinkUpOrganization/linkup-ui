import { verificationCooldown } from "@/api/auth";
import { useState, useEffect, useCallback } from "react";

const RESEND_TIMEOUT = 30;

export function useResendTimer() {
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(RESEND_TIMEOUT);

  const startResendTimer = useCallback(() => {
    setResendDisabled(true);
    setResendTimer(RESEND_TIMEOUT);
  }, []);

  useEffect(() => {
    const initializeCooldown = async () => {
      const { success, data: cooldownSecondsLeft } = await verificationCooldown();

      if (success && cooldownSecondsLeft !== undefined && cooldownSecondsLeft > 0) {
        setResendDisabled(true);
        setResendTimer(cooldownSecondsLeft);
      } else {
        setResendDisabled(false);
        setResendTimer(RESEND_TIMEOUT);
      }
    };

    initializeCooldown();
  }, []);

  useEffect(() => {
    if (!resendDisabled) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          setResendDisabled(false);
          clearInterval(interval);
          return RESEND_TIMEOUT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendDisabled]);

  return {
    resendDisabled,
    resendTimer,
    startResendTimer,
  };
}
