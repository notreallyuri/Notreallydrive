import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center p-4",
        "bg-gradient-to-br from-black via-neutral-900 to-neutral-800",
      )}
    >
      <main className="text-center">
        <h1 className="mb-4 bg-gradient-to-r from-neutral-200 to-neutral-300 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          NotreallyDrive
        </h1>
        <p className="mx-auto mb-8 max-w-md text-neutral-400">
          Secure, fast and easy file storage for modern web
        </p>
        <Button
          asChild
          size="lg"
          className="bg-neutral border border-neutral-700 text-white hover:bg-neutral-700"
        >
          <Link href={{ pathname: "/auth", query: { tab: "signup" } }}>
            Get Started
          </Link>
        </Button>
      </main>
    </div>
  );
}
