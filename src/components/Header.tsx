import { getProfile, isAuthenticated, logout } from "@/services/pocketbase";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo.svg";
import UserAvatar from "./UserAvatar";

export default function Header() {
  const profile = getProfile()!;
  const navigate = useNavigate();

  function logoutAndReload() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="h-auto">
      <AppBar position="fixed">
        <Toolbar>
          <Link to={"/feed"}>
            <img src={logo} height="48" width="48" />
          </Link>
          <span className="flex-grow" />
          {isAuthenticated() ? (
            <>
              <UserAvatar user={profile} />
              <Button onClick={logoutAndReload} color="error">
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
