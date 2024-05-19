import { Button } from "@mui/material";
import { ErrorComponentProps, Link } from "@tanstack/react-router";
import internalServerErrorImage from "@/assets/500 InternalServerError.png";

export default function Error({ reset }: ErrorComponentProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img
        src={internalServerErrorImage}
        alt="500 Internal Server Error"
        width="500"
      />
      <h1 className="text-3xl">Oops! Something went wrong</h1>
      <Button component={Link} onClick={reset} to="/">
        Return home
      </Button>
    </div>
  );
}
