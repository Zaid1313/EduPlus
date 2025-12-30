// app/dashboard/layout.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode 
}>) {
  const session = await getServerSession(authOptions);
  const roleLabel =
    session?.user.role === "EDUCATOR"
      ? "Educator Dashboard"
      : "Student Dashboard";

  return (
    <DashboardShell
      roleLabel={roleLabel}
      role={session!.user.role as "EDUCATOR" | "STUDENT"}
    >
      {children}
    </DashboardShell>
  );
}
