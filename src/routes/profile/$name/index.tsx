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
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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

  const profile = query.data as any;

  const postsQuery = useQuery({
    queryKey: ["PostsForUser"],
    queryFn: () => getPostsOfUser(profile.id),
  });

  let authenticatedUser: any;
  try {
    authenticatedUser = getProfile();
  } catch {
    authenticatedUser = undefined;
  }

  document.title = `Profile of ${profile.name} / Y`;

  const isOwnProfile = profile.id == (authenticatedUser.id ?? -1);

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
            <Typography variant="body1">
              {profile.description}
              {isOwnProfile ? (
                <IconButton
                  component={Link}
                  to="./settings"
                  aria-label="delete"
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </Typography>
          </div>
        </div>
        <Stack spacing={2}>
          {postsQuery.data?.items.map((p) => (
            <Link to="/post/$id" params={{ id: p.id }}>
              <Post user={profile} post={p} key={p.id} />
            </Link>
          ))}
        </Stack>
      </div>
    </>
  );
}
