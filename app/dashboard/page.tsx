import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Welcome to your Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Role</CardTitle>
          </CardHeader>
          <CardContent>{session.user.role}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>{session.user.email}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>Active</CardContent>
        </Card>
      </div>
      <div className="mt-6 mb-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6 space-y-3">
            {session.user.role === "STUDENT" ? (
              <>
                <h3 className="text-xl font-semibold">
                  Discover New Learning Opportunities
                </h3>
                <p className="text-muted-foreground">
                  Explore our latest courses and start learning something new
                  today.
                </p>

                <a
                  href="/courses"
                  className="inline-block text-primary font-medium underline"
                >
                  Browse Courses →
                </a>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">
                  Ready to Create Your Next Course?
                </h3>
                <p className="text-muted-foreground">
                  Share your knowledge by creating and managing courses for
                  students.
                </p>

                <a
                  href="/dashboard/create-course"
                  className="inline-block text-primary font-medium underline"
                >
                  Create a Course →
                </a>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
