import { getProfileByName } from "@/services/pocketbase";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryClient } from "@/routes/__root";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

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
	const [loading, _setLoading] = useState(false);
  const query = useSuspenseQuery(options);

  if (query.isError) {
    // TODO
    throw query.error;
  }

  const profile = query.data as any;

  return (
    <div className="container mx-auto py-16">
      Settings page!
			<form>
				<Grid container>
					<Grid xs={6}><Typography>Description</Typography></Grid>
					<Grid xs={6}><TextField multiline label="Description" defaultValue={profile.description} /></Grid>

					<Grid xs={2}>
						<LoadingButton loading={loading} variant="contained" type="submit">
							Update
						</LoadingButton>
					</Grid>
				</Grid>
			</form>
    </div>
  );
}
