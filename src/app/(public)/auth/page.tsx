import { AuthTabs } from "@/components/onboard/auth_tabs";
import { Suspense } from "react";

export default function AuthPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Suspense fallback={null}>
        <AuthTabs />
      </Suspense>
    </div>
  );
}
