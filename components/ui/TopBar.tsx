import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/app/dashboard/LogoutButton";

export default async function TopBar({ title }: { title?: string }) {
  const session = await getServerSession(authOptions);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-card pr-8">
      <div className="flex items-center gap-4">
        {session && (
          <span className="text-xl font-semibold">
            {session.user.role}
          </span>
        )}
      </div>
      {session && <LogoutButton />}
    </header>
  );
}
