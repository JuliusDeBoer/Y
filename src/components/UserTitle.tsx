import { User } from "@/types/pocketbase";
import { Typography } from "@mui/material";
import UserAvatar from "@/components/UserAvatar";

type props = {
  user: User;
};

export default function UserTitle({ user }: props) {
  return (
    <div>
      <UserAvatar user={user} />
      <Typography variant="h5">{user.name}</Typography>
    </div>
  );
}
