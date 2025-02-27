import { useState } from "react";

export default function SignUpForm() {
  const [username, setUsername] = useState("");

  const checkUsername = () => {
    // TODO(Julius)
  };

  return (
    <form className="flex flex-col items-start">
      <label className="text-slate-600">What should we call you?</label>
      <input
        type="text"
        className="border border-gray-400 p-2 rounded-md mb-4"
        placeholder="Username"
        onBlur={checkUsername}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label className="text-slate-600">How can we keep in touch?</label>
      <input
        type="email"
        className="border border-gray-400 p-2 rounded-md mb-4"
        placeholder="Email address"
        required
      />

      <label className="text-slate-600">Now only a good password...</label>
      <input
        type="password"
        className="border border-gray-400 p-2 rounded-md mb-8"
        placeholder="Password"
        required
      />
      <input
        type="submit"
        value="Create Account"
        className="bg-indigo-600 px-6 py-3 text-white font-bold rounded-lg hover:cursor-pointer"
      />
    </form>
  );
}
