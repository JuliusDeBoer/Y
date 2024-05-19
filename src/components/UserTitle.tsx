import { User } from "@/types/pocketbase";
import { Typography } from "@mui/material";
import UserAvatar from "@/components/UserAvatar";

type props = {
  user: User;
};

export default function UserTitle({ user }: props) {
  return (
    <div className="flex items-center">
      <UserAvatar user={user} />
      <span className="px-1" />
      <Typography variant="h6">{user.name}</Typography>
    </div>
  );
}
