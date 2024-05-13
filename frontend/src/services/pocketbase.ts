import { redirect } from "@tanstack/react-router";
import Pocketbase from "pocketbase";

let pb: Pocketbase;

type User = {
  name: string;
};

export function connect() {
  pb = new Pocketbase(import.meta.env.VITE_API_URL);

  healthCheck().then((res) => {
    if (Object.keys(res).length === 0 && res.constructor === Object) {
      console.error("Could not reach API!");
      return;
    }

    if (Math.floor(res.code / 100) != 2) {
      console.error(res.message, res.data);
      return;
    }

    console.log(res.message);
  });
}

export function healthCheck() {
  return pb.health.check();
}

export async function signUp(
  username: string,
  email: string,
  password: string,
) {
  const data = {
    username: username,
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: password,
    name: username,
    description: "",
  };

  pb.collection("users").create(data);
}

export function login(email: string, password: string) {
  return pb.collection("users").authWithPassword(email, password);
}

export function logout() {
  pb.authStore.clear();
}

export function isAuthenticated() {
  return pb.authStore.isValid;
}

export function authBeforeLoad() {
  if (!isAuthenticated()) {
    throw redirect({
      to: "/login",
    });
  }
}

export function getProfile() {
	return pb.authStore.model as User;
}

export function getProfileByName(name: string) {
	return pb.collection('users').getFirstListItem(`username="${name}"`);

}
