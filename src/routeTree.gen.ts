/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as FeedImport } from "./routes/feed";
import { Route as PostIdImport } from "./routes/post/$id";
import { Route as ProfileNameIndexImport } from "./routes/profile/$name/index";

// Create Virtual Routes

const SignUpLazyImport = createFileRoute("/sign-up")();
const LoginLazyImport = createFileRoute("/login")();
const IndexLazyImport = createFileRoute("/")();
const ProfileNameSettingsLazyImport = createFileRoute(
  "/profile/$name/settings",
)();

// Create/Update Routes

const SignUpLazyRoute = SignUpLazyImport.update({
  path: "/sign-up",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/sign-up.lazy").then((d) => d.Route));

const LoginLazyRoute = LoginLazyImport.update({
  path: "/login",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/login.lazy").then((d) => d.Route));

const FeedRoute = FeedImport.update({
  path: "/feed",
  getParentRoute: () => rootRoute,
} as any);

const IndexLazyRoute = IndexLazyImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const PostIdRoute = PostIdImport.update({
  path: "/post/$id",
  getParentRoute: () => rootRoute,
} as any);

const ProfileNameIndexRoute = ProfileNameIndexImport.update({
  path: "/profile/$name/",
  getParentRoute: () => rootRoute,
} as any);

const ProfileNameSettingsLazyRoute = ProfileNameSettingsLazyImport.update({
  path: "/profile/$name/settings",
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import("./routes/profile/$name/settings.lazy").then((d) => d.Route),
);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/feed": {
      id: "/feed";
      path: "/feed";
      fullPath: "/feed";
      preLoaderRoute: typeof FeedImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/sign-up": {
      id: "/sign-up";
      path: "/sign-up";
      fullPath: "/sign-up";
      preLoaderRoute: typeof SignUpLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/post/$id": {
      id: "/post/$id";
      path: "/post/$id";
      fullPath: "/post/$id";
      preLoaderRoute: typeof PostIdImport;
      parentRoute: typeof rootRoute;
    };
    "/profile/$name/settings": {
      id: "/profile/$name/settings";
      path: "/profile/$name/settings";
      fullPath: "/profile/$name/settings";
      preLoaderRoute: typeof ProfileNameSettingsLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/profile/$name/": {
      id: "/profile/$name/";
      path: "/profile/$name";
      fullPath: "/profile/$name";
      preLoaderRoute: typeof ProfileNameIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  FeedRoute,
  LoginLazyRoute,
  SignUpLazyRoute,
  PostIdRoute,
  ProfileNameSettingsLazyRoute,
  ProfileNameIndexRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/feed",
        "/login",
        "/sign-up",
        "/post/$id",
        "/profile/$name/settings",
        "/profile/$name/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/feed": {
      "filePath": "feed.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.lazy.tsx"
    },
    "/post/$id": {
      "filePath": "post/$id.tsx"
    },
    "/profile/$name/settings": {
      "filePath": "profile/$name/settings.lazy.tsx"
    },
    "/profile/$name/": {
      "filePath": "profile/$name/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
