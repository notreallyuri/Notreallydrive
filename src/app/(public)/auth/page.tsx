import { AuthTabs } from "@/components/onboard/auth_tabs";
import { Suspense } from "react";

export default function AuthPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <AuthTabs />
      </Suspense>
    </div>
  );
}
