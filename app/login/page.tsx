import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // ✅ If already logged in, do NOT allow login again
  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
