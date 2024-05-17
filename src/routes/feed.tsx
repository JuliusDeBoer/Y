import { authBeforeLoad, getProfile } from "@/services/pocketbase";
import { createFileRoute } from "@tanstack/react-router";
import Grid from "@mui/material/Unstable_Grid2";
import { Avatar, Button, Card, CardContent, TextField } from "@mui/material";

export const Route = createFileRoute("/feed")({
  beforeLoad: authBeforeLoad,
  component: Feed,
});

function Feed() {
  const profile = getProfile();

  return (
    <Grid container className="container !mx-auto !mt-16">
      <Grid xs={3}></Grid>
      <Grid xs={6}>
			{profile == undefined ? <></> : <Card variant="outlined">
          <CardContent>
            <Avatar>{profile.name[0]}</Avatar>
            <TextField
              id="filled-multiline-static"
              label="Why?"
              multiline
              rows={4}
              fullWidth
            />
            <br />
            <Button>Post</Button>
          </CardContent>
        </Card> }
      </Grid>
      <Grid xs={3}></Grid>
    </Grid>
  );
}
