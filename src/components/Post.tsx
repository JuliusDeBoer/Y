import { User } from "@/types/pocketbase";
import { Card, CardContent, Typography } from "@mui/material";
import UserTitle from "@/components/UserTitle";

type props = {
  content: string;
  user: User;
};

export default function Post({ content, user }: props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <UserTitle user={user} />
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
}
