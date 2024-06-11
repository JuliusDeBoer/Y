import { Button, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import notFoundImage from "@/assets/404 NotFound.png";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <img src={notFoundImage} alt="400 Not Found" width="500" />
      <Typography variant="h5" component="h1">
        Oops! We didnt find what you where looking for!
      </Typography>
      <Link to="/">
        <Button>Return home</Button>
      </Link>
    </div>
  );
}
