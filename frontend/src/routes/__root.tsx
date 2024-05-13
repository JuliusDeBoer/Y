import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "@/components/header";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
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
  );
}
