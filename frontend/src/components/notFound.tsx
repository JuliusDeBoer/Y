import { Button, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Typography variant="h1">404</Typography>
      <Typography variant="subtitle1">Not Found</Typography>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
}
