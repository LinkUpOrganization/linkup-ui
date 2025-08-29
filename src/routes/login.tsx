import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { useAuth } from "@/contexts/AuthProvider";
import { Box, Card, CardContent, Typography, Alert, Divider } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LoginForm from "@/components/auth/LoginForm";
import AuthPrompt from "@/components/auth/AuthPrompt";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { loginMutation } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (data: LoginPayload) => {
    try {
      setError("");
      await loginMutation.mutateAsync(data);
      navigate({ to: "/profile" });
    } catch (error: any) {
      setError(error.response.data ?? "Failed to create an account");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h2" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
              {error}
            </Alert>
          )}

          <GoogleAuthButton />

          <Divider sx={{ my: 2 }}>or</Divider>

          <LoginForm onSubmit={handleLogin} />

          <AuthPrompt text="Don't have an account?" linkText="Register" to="/register" />
        </CardContent>
      </Card>
    </Box>
  );
}
