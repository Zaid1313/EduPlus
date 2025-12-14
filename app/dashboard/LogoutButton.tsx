"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-l text-white bg-black p-2 rounded cursor-pointer font-semibold hover:text-red-400 transition"
    >
      Logout
    </button>
  );
}
