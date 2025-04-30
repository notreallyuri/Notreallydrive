import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./_providers/posthog-provider";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

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
    <ClerkProvider>
      <PostHogProvider>
        <html lang="en" className={`${geist.variable}`}>
          <body>{children}</body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}
