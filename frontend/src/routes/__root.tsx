import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactGA from 'react-ga4';

export const Route = createRootRoute({
  component: Root,
});

if(import.meta.env.VITE_GA_ID) {
	ReactGA.initialize(import.meta.env.VITE_GA_ID);
} else {
	console.warn("WARN: VITE_GA_ID was not provided! Not setting up react-ga4");
}

// HACK: Dont do this. Or at least move this to a seperate file
export const queryClient = new QueryClient();

function Root() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="w-full h-screen pt-[64px]">
          <Header />
          <Outlet />
        </div>
        <Suspense>
          {import.meta.env.PROD ? <></> : <TanStackRouterDevtools />}
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
