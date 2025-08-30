import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginShema, type LoginFormData } from "@/schemas/authSchemas";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import PasswordField from "./PasswordInput";

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
  isPending: boolean;
};

export default function LoginForm({ onSubmit, isPending }: LoginFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message ?? ""}
          />
        )}
      />

      <PasswordField
        name="password"
        control={control}
        label="Password"
        error={errors.password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <Button type="submit" fullWidth variant="contained" disabled={isPending} sx={{ mt: 2, py: 1.2 }}>
        Login
      </Button>
    </Box>
  );
}
