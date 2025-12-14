import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  category: z.string().min(3),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
});
