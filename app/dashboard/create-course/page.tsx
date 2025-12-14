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


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";

// export default function CreateCoursePage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     level: "BEGINNER",
//   });

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (loading) return;

//     setLoading(true);

//     try {
//       const res = await fetch("/api/courses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) throw new Error();

//       toast.success("Course created", {
//         description: "Your course is now live.",
//       });

//       router.push("/courses");
//     } catch {
//       toast.error("Something went wrong", {
//         description: "Please check your inputs and try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-xl">
//       <h1 className="text-2xl font-bold mb-4">Create Course</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           placeholder="Course Title"
//           value={form.title}
//           onChange={(e) =>
//             setForm({ ...form, title: e.target.value })
//           }
//           required
//         />

//         <Textarea
//           placeholder="Course Description"
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           className="min-h-[200px]"
//           required
//         />

//         <Input
//           placeholder="Category"
//           value={form.category}
//           onChange={(e) =>
//             setForm({ ...form, category: e.target.value })
//           }
//           required
//         />

//         <Select
//           value={form.level}
//           onValueChange={(value) =>
//             setForm({ ...form, level: value })
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select level" />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="BEGINNER">Beginner</SelectItem>
//             <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
//             <SelectItem value="ADVANCED">Advanced</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button type="submit" className="w-full" disabled={loading}>
//           {loading ? "Creating..." : "Create Course"}
//         </Button>
//       </form>
//     </div>
//   );
// }
