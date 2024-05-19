export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Post = {
  id: string;
  user: string;
  content: string;
  created: string;
};
