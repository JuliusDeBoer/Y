import { actions } from "astro:actions";
import { useState, type FormEvent } from "react";

export default function SignUpForm() {
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const checkUsername = () => {
    actions.handleAvailable(handle).then((available) => {
      if (available) {
        console.log("Username available!");
      } else {
        console.log("Username is not available");
      }
    });
  };

  const submit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const { error } = await actions.signUp({
      handle: handle,
      email: email,
      password: password,
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
    } else {
      window.location.href = "/feed";
    }
  };

  return (
    <form className="flex flex-col items-start" onSubmit={submit}>
      <label htmlFor="handle" className="text-slate-600">
        What should we call you?
      </label>
      <input
        type="text"
        id="handle"
        className="border border-gray-400 p-2 rounded-md mb-4"
        placeholder="Handle"
        onBlur={checkUsername}
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        required
      />

      <label htmlFor="email" className="text-slate-600">
        How can we keep in touch?
      </label>
      <input
        type="email"
        id="email"
        className="border border-gray-400 p-2 rounded-md mb-4"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password" className="text-slate-600">
        Now only a good password...
      </label>
      <input
        type="password"
        id="password"
        className="border border-gray-400 p-2 rounded-md mb-8"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {loading ? (
        <div className="w-40 h-12 bg-indigo-400 flex justify-center items-center rounded-lg">
          <span className="animate-spin">Spinning icon go brrr</span>
        </div>
      ) : (
        <input
          type="submit"
          value="Create Account"
          className="bg-indigo-600 w-40 h-12 text-white font-bold rounded-lg hover:cursor-pointer"
        />
      )}
    </form>
  );
}
