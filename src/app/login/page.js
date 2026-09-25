"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);

    try {
      const data = await login(username, password);

      localStorage.setItem("accessToken", data.accessToken);

      router.push("/products");
    } catch (error) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Product Admin
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={function (event) {
                setUsername(event.target.value);
              }}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={function (event) {
                setPassword(event.target.value);
              }}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 rounded-md bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-medium">Test credentials</p>
          <p>Username: emilys</p>
          <p>Password: emilyspass</p>
        </div>
      </div>
    </main>
  );
}