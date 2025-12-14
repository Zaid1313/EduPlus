// app/courses/[id]/AISummary.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AISummary({
    courseId,
}: {
    courseId: string;
}) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    try {
      const res = await fetch("/api/ai/course-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch {
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-3">
      <Button className="cursor-pointer" onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate AI Summary"}
      </Button>

      {summary && (
        <div className="border rounded p-4 bg-muted text-sm whitespace-pre-line">
          {summary}
        </div>
      )}
    </div>
  );
}
