import { getProfile, getProfileByName } from "@/services/pocketbase";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { queryClient } from "@/routes/__root";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const Route = createFileRoute("/profile/$name/")({
  component: Profile,
  loader: ({ params }) => {
    const postsQueryOptions = queryOptions({
      queryKey: ["profile"],
      queryFn: () => fetchProfile(params),
    });

    queryClient.ensureQueryData(postsQueryOptions);
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

  const isOwnProfile = profile.id == (authenticatedUser.id ?? -1);

  return (
    <div className="container mx-auto py-16">
      <div className="flex items-top">
        <Avatar sx={{ width: 128, height: 128 }}>{profile.name[0]}</Avatar>
        <div>
          <Typography variant="h4" component="h1">
            {profile.name}
          </Typography>
          <Typography variant="body1">
            {profile.description}
            {isOwnProfile ? (
              <IconButton component={Link} to="./settings" aria-label="delete">
                <EditIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Typography>
        </div>
      </div>
    </div>
  );
}
