import { isAuthenticated } from "@/services/pocketbase";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.svg";
import { Typography } from "@mui/material";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  if (isAuthenticated()) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img src={logo} width="128" />
      <Typography variant="h1" className="text-center">
        The new social media platform
      </Typography>
    </div>
  );
}
