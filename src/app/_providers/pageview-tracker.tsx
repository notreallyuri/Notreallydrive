"use client";
import { usePostHog } from "posthog-js/react";
import { useUser } from "@clerk/nextjs";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PostHogPageView(): null {
  const posthog = usePostHog();
  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user?.id) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
      });
    } else {
      posthog.reset();
    }
  }, [posthog, userInfo.user]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, posthog, searchParams]);

  return null;
}
