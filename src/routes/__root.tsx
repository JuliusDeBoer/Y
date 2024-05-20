import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Suspense } from "preact/compat";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "@/components/Header";
import ReactGA from "react-ga4";
import { RouterContext } from "@/types/routerContext";
import { Helmet } from "react-helmet";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
});

if (import.meta.env.VITE_GA_ID) {
  ReactGA.initialize(import.meta.env.VITE_GA_ID);
} else {
  console.warn("WARN: VITE_GA_ID was not provided! Not setting up react-ga4");
}

function Root() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Helmet>
        <title>Y</title>
        <meta
          name="description"
          content="The new social media platform that makes you ask: 'why?'"
        />
      </Helmet>
      <CssBaseline />
      <div className="w-full h-screen">
        <Header />
        <Outlet />
      </div>
      <Suspense fallback={<></>}>
        {import.meta.env.PROD ? <></> : <TanStackRouterDevtools />}
      </Suspense>
    </ThemeProvider>
  );
}
