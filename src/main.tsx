import { RouterProvider, createRouter } from "@tanstack/react-router";
import Error from "@/components/Error";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";
import { render } from "preact";

import { connect } from "@/services/pocketbase";

import "@/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { routeTree } from "@/routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  trailingSlash: "never",
  defaultErrorComponent: Error,
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: Loading,
  context: {
    queryClient: queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

connect();

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
    rootElement,
  );
}
