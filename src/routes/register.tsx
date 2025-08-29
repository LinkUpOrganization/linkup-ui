import { Box, Card, CardContent, Divider, Typography, Alert } from "@mui/material";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import RegisterForm from "@/components/auth/RegisterForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { RegisterFormData } from "@/schemas/authSchemas";
import { useAuth } from "@/contexts/AuthProvider";
import { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AuthPrompt from "@/components/auth/AuthPrompt";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { registerMutation } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setError("");
      await registerMutation.mutateAsync(data);
      navigate({ to: "/verify-email" });
    } catch (error: any) {
      setError(error.response.data ?? "Failed to create an account");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h2" align="center" gutterBottom>
            Create Account
          </Typography>

          {error && (
            <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
              {error}
            </Alert>
          )}

          <GoogleAuthButton />

          <Divider sx={{ my: 2 }}>or</Divider>

          <RegisterForm onSubmit={handleRegister} />

          <AuthPrompt text="Already have an account?" linkText="Login" to="/login" />
        </CardContent>
      </Card>
    </Box>
  );
}
