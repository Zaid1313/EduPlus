// app/dashboard/layout.tsx

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TopBar from "@/components/ui/TopBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const roleLabel =
    session?.user.role === "EDUCATOR"
      ? "Educator Dashboard"
      : "Student Dashboard";

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        {/* Logo / Role */}
        <div className="p-6 border-b border-white/10">
          <h2 className="font-bold text-2xl text-red-500 tracking-wide">
            EduPlus
          </h2>

          <p className="text-sm text-gray-400 mt-2">{roleLabel}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3">
          <Link
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-red-400 transition"
          >
            Dashboard
          </Link>

          {session?.user.role === "EDUCATOR" && (
            <Link
              href="/dashboard/create-course"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-red-400 transition"
            >
              Create Course
            </Link>
          )}

          <Link
            href="/courses"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-red-400 transition"
          >
            View Courses
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* 
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card">
          <h1 className="text-xl font-semibold">{roleLabel}</h1>
         
          <div className="p-6 border-t border-white/10">
            <LogoutButton />
          </div>
        </header> */}

        <TopBar title={roleLabel} />

        {/* Page content */}
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}