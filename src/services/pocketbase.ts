import { Post, User } from "@/types/pocketbase";
import { redirect } from "@tanstack/react-router";
import Pocketbase, { ListResult } from "pocketbase";

let pb: Pocketbase;

export async function connect() {
  pb = new Pocketbase(import.meta.env.VITE_API_URL);

  return healthCheck().then((res) => {
    if (Object.keys(res).length === 0 && res.constructor === Object) {
      throw Error("Could not reach API!");
    }

    if (Math.floor(res.code / 100) != 2) {
      throw Error(res.message);
    }

    console.log(res.message);
  });
}

export function healthCheck() {
  return pb.health.check();
}

export function signUp(username: string, email: string, password: string) {
  const data = {
    username: username,
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: password,
    name: username,
    description: "",
  };

  return pb.collection("users").create(data);
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
  return pb.collection("users").getFirstListItem(`username="${name}"`);
}

export function getPosts(
  page?: number | undefined,
  perPage?: number | undefined,
): Promise<ListResult<Post & { expand: { user: User } }>> {
  return pb.collection<Post>("posts").getList(page, perPage, {
    expand: "user",
    sort: "-created",
  });
}

export function post(content: string) {
  return pb
    .collection<Post>("posts")
    .create({ user: pb.authStore.model?.id, content: content });
}
