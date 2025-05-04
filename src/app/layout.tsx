import "@/styles/globals.css";

import { PostHogProvider } from "./_providers/posthog-provider";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Notreallydrive",
  description: "A worse Google Drive",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PostHogProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </PostHogProvider>
  );
}