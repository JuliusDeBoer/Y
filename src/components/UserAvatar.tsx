import { User } from "@/types/pocketbase";
import { Avatar } from "@mui/material";

type props = {
  user: User;
};

export default function UserAvatar({ user }: props) {
  if (user.avatar.length === 0) {
    return <Avatar alt={user.name}>{user.name[0]}</Avatar>;
  } else {
    return <Avatar alt={user.name} src={user.avatar} />;
  }
}
