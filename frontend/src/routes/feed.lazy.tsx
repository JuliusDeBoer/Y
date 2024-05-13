import { authBeforeLoad } from "@/services/pocketbase";
import { createFileRoute } from "@tanstack/react-router";
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Card, CardContent, TextField } from "@mui/material";

export const Route = createFileRoute("/feed")({
  beforeLoad: authBeforeLoad,
  component: Feed,
});

function Feed() {
  return <Grid container className="container !mx-auto !mt-16">
		<Grid xs={3}></Grid>
		<Grid xs={6}>
			<Card variant="outlined">
				<CardContent>
					<TextField
						id="filled-multiline-static"
						label="Why?"
						multiline
						rows={4}
						// variant="filled"
					/>
					<br />
					<Button>Post</Button>
				</CardContent>
			</Card>
		</Grid>
		<Grid xs={3}></Grid>
	</Grid>
}
