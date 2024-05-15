import { getProfileByName } from "@/services/pocketbase";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryClient } from "@/routes/__root";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import Grid from '@mui/material/Unstable_Grid2';
import { Input, Typography } from "@mui/material";

export const Route = createFileRoute("/profile/$name/settings")({
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

  return (
    <div className="container mx-auto py-16">
      Settings page!
			<Grid container>
				<Grid xs={6}><Typography>Description</Typography></Grid>
				<Grid xs={6}><Input aria-label="Demo input" multiline placeholder="Type something…" /></Grid>
			</Grid>
    </div>
  );
}
