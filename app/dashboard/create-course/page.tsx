// app/dashboard/create-course/page.tsx

import CreateCourseForm from "@/components/ui/CreateCourseForm";

export default function CreateCoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <CreateCourseForm />
    </div>
  );
}