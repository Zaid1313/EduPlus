import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-card text-foreground">
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-4 flex flex-col md:flex-row items-center justify-between text-sm">
        <p className="text-muted-foreground mr-2">
          © {new Date().getFullYear()} EduPlus
        </p>

        <div className="flex gap-4">
          <Link
            href="https://github.com/Zaid1313/EduPlus"
            target="_blank"
            className="hover:text-primary transition"
          >
            GitHub
          </Link>

          <Link
            href="https://www.linkedin.com/in/mohd-zaid-5730a4248/"
            target="_blank"
            className="hover:text-primary transition"
          >
            LinkedIn
          </Link>

          <span className="text-muted-foreground">
            Built by <strong>Mohd Zaid</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
