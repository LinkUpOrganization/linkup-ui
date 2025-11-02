import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { ROUTES } from "@/constants/routes";

export function useProfilePage() {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();

  const handleVerifyEmail = () => {
    navigate({ to: ROUTES.VERIFY_EMAIL });
  };

  const {
    mutate: handleLogout,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setToken(null);
      navigate({ to: "/", search: { sort: "recent" } });
    },
  });

  return { user, handleVerifyEmail, handleLogout, isPending, isError, error };
}
