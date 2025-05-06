import "@/styles/globals.css";

import { PostHogProvider } from "./_providers/posthog-provider";
import { ThemeProvider } from "./_providers/theme-provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Notreallydrive",
  description: "A worse Google Drive",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PostHogProvider>
      <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
        <body>
          <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </PostHogProvider>
  );
}
