import { getPostById } from "@/services/pocketbase";
import { Grid } from "@mui/material";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import PostCard from "@/components/Post";

export const Route = createFileRoute("/post/$id")({
  component: Post,
  loader: ({ params, context }) => {
    const postsQueryOptions = queryOptions({
      queryKey: ["postById"],
      queryFn: () => fetchProfile(params),
    });

    context.queryClient.ensureQueryData(postsQueryOptions);
    return postsQueryOptions;
  },
});

function fetchProfile(params: { id: string }) {
  try {
    return getPostById(params.id);
  } catch {
    throw notFound();
  }
}

function Post() {
  const options = Route.useLoaderData();
  const post = useSuspenseQuery(options).data!;

  return (
    <>
      <Helmet>
        <title>Post of {post.expand.user.name}</title>
      </Helmet>
			<Grid container className="container !mx-auto !mt-16">
				<Grid sm={3} xs={1}></Grid>
				<Grid sm={6} xs={10}>
					<PostCard user={post.expand.user} post={post} />
				</Grid>
				<Grid sm={3} xs={1}></Grid>
			</Grid>
    </>
  );
}
