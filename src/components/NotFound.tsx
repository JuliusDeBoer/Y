import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import notFoundImage from "@/assets/404 NotFound.png";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <img src={notFoundImage} alt="400 Not Found" width="500" />
      <h1 className="text-3xl">
        Oops! We didnt find what you where looking for!
      </h1>
      <Link to="/">
        <Button>Return home</Button>
      </Link>
    </div>
  );
}
