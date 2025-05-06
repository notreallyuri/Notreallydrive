import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center p-4",
      )}
    >
      <main className="text-center">
        <h1
          className={cn(
            "mb-4 bg-clip-text text-5xl font-bold text-transparent md:text-6xl",
            "bg-gradient-to-r from-neutral-800 to-neutral-600",
            "dark:from-gray-500 dark:to-gray-400",
          )}
        >
          NotreallyDrive
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-md">
          Secure, fast and easy file storage for modern web
        </p>
        <Button asChild size="lg" variant="outline">
          <Link href={{ pathname: "/auth", query: { tab: "signup" } }}>
            Get Started
          </Link>
        </Button>
      </main>
    </div>
  );
}
