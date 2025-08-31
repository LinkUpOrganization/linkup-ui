import { ROUTES } from "@/constants/routes";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest")({
  beforeLoad: ({ context }) => {
    const { checkedAuth, token } = context.auth;

    if (token && checkedAuth) {
      throw redirect({ to: ROUTES.PROFILE });
    }
  },
});
