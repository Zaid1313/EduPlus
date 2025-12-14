// app/api/ai/course-summary/route.ts

// for google gemini API
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        summary: "AI summary is not configured.",
      });
    }

    const { courseId } = await req.json();

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: {
          select: {
            title: true,
            content: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({
        summary: "Course not found.",
      });
    }

    const lessonsText = course.lessons
      .map(
        (lesson, index) =>
          `Lesson ${index + 1}: ${lesson.title}\n${lesson.content}`
      )
      .join("\n\n");

    const prompt = `
You are an expert instructional designer.

Course Title: ${course.title}
Course Description: ${course.description}

Lessons:
${lessonsText}

Create a concise, learner-friendly summary explaining what a student will learn from this course.
Keep it under 120 words.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({ summary: response });
  } catch (error) {
    console.error("Gemini AI error:", error);

    return NextResponse.json({
      summary:
        "AI summary is temporarily unavailable. This feature requires an active AI quota.",
    });
  }
}



// for openai API 
// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { prisma } from "@/lib/prisma";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   try {
//     if (!process.env.OPENAI_API_KEY) {
//       return NextResponse.json(
//         { summary: "AI summary is not configured." },
//         { status: 200 }
//       );
//     }

//     const { courseId } = await req.json();

//     // Fetch course + lessons
//     const course = await prisma.course.findUnique({
//       where: { id: courseId },
//       include: {
//         lessons: {
//           select: {
//             title: true,
//             content: true,
//           },
//         },
//       },
//     });

//     if (!course) {
//       return NextResponse.json(
//         { summary: "Course not found." },
//         { status: 404 }
//       );
//     }

//     // Build lesson text for AI
//     const lessonsText = course.lessons
//       .map(
//         (lesson, index) =>
//           `Lesson ${index + 1}: ${lesson.title}\n${lesson.content}`
//       )
//       .join("\n\n");

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an expert instructional designer, Create clear and engaging course summaries for students.",
//         },
//         {
//           role: "user",
//           content: `
// Course Title: ${course.title}
// Course Description: ${course.description}
// Lessons: ${lessonsText}

// Create a concise, learner-friendly summary explaining what a student will learn from this course, use course title, description and lessons and keep it short and crisp.
// `,
//         },
//       ],
//     });

//     return NextResponse.json({
//       summary: completion.choices[0].message.content,
//     });
//   } catch (error) {
//     console.error("AI summary error:", error);

//     // Graceful fallback (VERY IMPORTANT)
//     return NextResponse.json({
//       summary:
//         "AI summary is temporarily unavailable. This feature requires an active AI quota.",
//     });
//   }
// }
