import { isAuthenticated } from "@/services/pocketbase";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.svg";
import { Helmet } from "react-helmet";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  if (isAuthenticated()) {
    return <Navigate to="/feed" />;
  }

  return (
    <>
      <Helmet>
        <title>Home / Y</title>
      </Helmet>
      <div className="w-full h-full flex flex-col justify-center items-center container mx-auto">
        <img src={logo} width="128" />
        <h1 className="text-5xl">
          The new social media platform that makes you ask: "why?"
        </h1>
      </div>
    </>
  );
}
