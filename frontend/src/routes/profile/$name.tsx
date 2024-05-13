import { getProfileByName } from "@/services/pocketbase";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$name")({
  component: Profile,
	loader: fetchProfile
});

let profile: any;

async function fetchProfile({ params }: { params: { name: string } }) {
	try {
		profile = await getProfileByName(params.name);
	} catch {
		throw notFound();
	}
}

function Profile() {
	console.debug(profile);
  return <h1>Profile of {profile.name}</h1>;
}
