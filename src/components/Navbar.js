"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    router.push("/login");
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Product Admin
          </h1>

          <p className="text-sm text-gray-500">
            Product management dashboard
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}