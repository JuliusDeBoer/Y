import { User } from "@/types/pocketbase";
import { Avatar } from "@mui/material";
import { Link } from "@tanstack/react-router";

type props = {
  user: User;
};

export default function UserAvatar({ user }: props) {
  if (user.avatar.length === 0) {
    return (
      <Link to="/profile/$name" params={{ name: user.name }}>
        <Avatar alt={user.name}>{user.name[0]}</Avatar>
      </Link>
    );
  } else {
    return (
      <Link to="/profile/$name" params={{ name: user.name }}>
        <Avatar alt={user.name} src={user.avatar} />
      </Link>
    );
  }
}
