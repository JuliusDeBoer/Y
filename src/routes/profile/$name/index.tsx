import {
  getPostsOfUser,
  getProfile,
  getProfileByName,
} from "@/services/pocketbase";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Avatar, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import Post from "@/components/Post";

export const Route = createFileRoute("/profile/$name/")({
  component: Profile,
  loader: ({ params, context }) => {
    const loadProfileOptions = queryOptions({
      queryKey: ["profile"],
      queryFn: () => fetchProfile(params),
    });

    context.queryClient.ensureQueryData(loadProfileOptions);
    return loadProfileOptions;
  },
});

function fetchProfile(params: { name: string }): any {
  try {
    return getProfileByName(params.name);
  } catch {
    throw notFound();
  }
}

function Profile() {
  const options = Route.useLoaderData();
  const query = useSuspenseQuery(options);

  if (query.isError) {
    // TODO
    throw query.error;
  }

  const profile = getProfile() as any;

  const postsQuery = useQuery({
    queryKey: ["PostsForUser"],
    queryFn: () => getPostsOfUser(profile.id),
  });

  document.title = `Profile of ${profile.name} / Y`;

  return (
    <>
      <Helmet>
        <title>
          {profile.name ? `Profile of ${profile.name} / Y` : "Profile / Y"}
        </title>
      </Helmet>
      <div className="container mx-auto py-16">
        <div className="flex items-top">
          <Avatar sx={{ width: 128, height: 128 }}>{profile.name[0]}</Avatar>
          <div>
            <h3 className="text-2xl">{profile.name}</h3>
            <Typography variant="body1">{profile.description}</Typography>
          </div>
        </div>
        <Stack spacing={2}>
          {postsQuery.data?.items.map((p) => (
            <Link key={p.id} to="/post/$id" params={{ id: p.id }}>
              <Post user={profile} post={p} key={p.id} />
            </Link>
          ))}
        </Stack>
      </div>
    </>
  );
}
