import { getProfile, getProfileByName } from "@/services/pocketbase";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Helmet } from "react-helmet";

export const Route = createFileRoute("/profile/$name/")({
  component: Profile,
  loader: ({ params, context }) => {
    const postsQueryOptions = queryOptions({
      queryKey: ["profile"],
      queryFn: () => fetchProfile(params),
    });

    context.queryClient.ensureQueryData(postsQueryOptions);
    return postsQueryOptions;
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
      </div>
    </>
  );
}
