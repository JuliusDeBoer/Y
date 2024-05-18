import { Button, Typography } from "@mui/material";
import { ErrorComponentProps, Link } from "@tanstack/react-router";

export default function Error({ reset }: ErrorComponentProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Typography variant="h4" component="h1">
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1">
        It seems something went wrong while loading the page.
      </Typography>
      <Button component={Link} onClick={reset} to="/">
        Return home
      </Button>
    </div>
  );
}
