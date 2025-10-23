import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import type { QueryClient } from "@tanstack/react-query";
import type { AuthContextType } from "@/contexts/AuthProvider";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const isDev = import.meta.env.MODE === "development";

    return (
      <>
        <Outlet />
        {isDev && (
          <TanstackDevtools
            config={{
              position: "bottom-left",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        )}
      </>
    );
  },
});
