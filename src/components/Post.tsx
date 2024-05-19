import { Card, CardContent, Typography } from "@mui/material";
import UserTitle from "@/components/UserTitle";
import { Post as PostType, User } from "@/types/pocketbase";

type props = {
  post: PostType;
  user: User;
};

export default function Post({ post, user }: props) {
  const date = new Date(post.created);

  return (
    <Card variant="elevation">
      <CardContent>
        <UserTitle user={user} />
        <Typography variant="body1" className="py-3">
          {post.content}
        </Typography>
        <p className="text-slate-500 text-xs">{date.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
