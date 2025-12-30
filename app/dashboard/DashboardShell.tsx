// app/dashboard/DashboardShell.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/ui/TopBar";
import Footer from "@/components/ui/Footer";
import { Menu, X } from "lucide-react";

export default function DashboardShell({
  children,
  roleLabel,
  role,
}: Readonly<{
  children: React.ReactNode;
  roleLabel: string;
  role: "EDUCATOR" | "STUDENT";
}>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-black text-white flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="font-bold text-2xl text-red-500 tracking-wide">
            EduPlus
          </h2>
          <p className="text-sm text-gray-400 mt-2">{roleLabel}</p>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <Link className="sidebar-link" href="/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          {role === "EDUCATOR" && (
            <Link className="sidebar-link" href="/dashboard/create-course" onClick={() => setOpen(false)}>
              Create Course
            </Link>
          )}

          <Link className="sidebar-link" href="/courses" onClick={() => setOpen(false)}>
            View Courses
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <TopBar
          title={roleLabel}
          leftSlot={
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 cursor-pointer"
            >
              <Menu />
            </button>
          }
        />

        <div className="flex-1 px-6 pt-4">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
