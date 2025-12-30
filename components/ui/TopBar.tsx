// components/ui/TopBar.tsx
"use client";
import LogoutButton from "@/app/dashboard/LogoutButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
export default function TopBar({
  title,
  leftSlot,
}: Readonly<{ title?: string; leftSlot?: React.ReactNode }>) {
  const pathname = usePathname();
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6">
      {" "}
      {/* Left side */}{" "}
      <div className="flex items-center gap-3">
        {" "}
        {leftSlot}{" "}
        {title && (
          <Link
            className="text-lg md:text-xl font-semibold flex flex-row hover:text-red-600"
            href={"/dashboard"}
          >
            {" "}
            {pathname !== "/dashboard" &&
              pathname !== "/dashboard/create-course" && (
                <ArrowLeft className="pt-1 w-5 h-5 self-center" />
              )}{" "}
            Dashboard{" "}
          </Link>
        )}{" "}
      </div>{" "}
      {/* Right side */} <LogoutButton />{" "}
    </header>
  );
}
