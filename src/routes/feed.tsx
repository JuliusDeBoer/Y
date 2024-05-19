import {
  authBeforeLoad,
  getPosts,
  getProfile,
  post,
} from "@/services/pocketbase";
import { createFileRoute } from "@tanstack/react-router";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/Post";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { useForm } from "@tanstack/react-form";
import * as v from "valibot";
import UserAvatar from "@/components/UserAvatar";

export const Route = createFileRoute("/feed")({
  beforeLoad: authBeforeLoad,
  component: Feed,
});

function Feed() {
  const profile = getProfile();
  const query = useQuery({ queryKey: ["posts"], queryFn: () => getPosts() });
  const form = useForm({
    validatorAdapter: valibotValidator,
    defaultValues: {
      content: "",
    },
    onSubmit: async ({ value }) => {
      const newPost = await post(value.content);
      value.content = "";
      query.data?.items.unshift({
        ...newPost,
        ...{ expand: { user: getProfile() } },
      });
    },
  });

  document.title = "Your feed | Y";

  return (
    <Grid container className="container !mx-auto !mt-16">
      <Grid sm={3} xs={1}></Grid>
      <Grid sm={6} xs={10}>
        {profile == undefined ? (
          <></>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <UserAvatar user={profile} />
            <form.Field
              name="content"
              validators={{
                onSubmit: v.string([
                  v.minLength(8, "Message must be at least 8 characters"),
                  v.maxLength(
                    281,
                    "Message cannot be longer that 281 characters",
                  ),
                ]),
              }}
            >
              {(field) => (
                <TextField
                  id="filled-multiline-static"
                  label="Why?"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  name={field.name}
                  error={field.state.meta.errors.length >= 1}
                  helperText={field.state.meta.errors[0]}
                  multiline
                  rows={4}
                  fullWidth
                />
              )}
            </form.Field>
            <Button type="submit">Post</Button>
          </form>
        )}
        <Stack spacing={2}>
          {query.data?.items.map((p) => (
            <Post user={p.expand.user} post={p} key={p.id} />
          ))}
        </Stack>
      </Grid>
      <Grid sm={3} xs={1}></Grid>
    </Grid>
  );
}
