"use client";
import { authClient } from "@/lib/auth-client";

export default function Sandbox() {
  const handleSigntOUt = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      <button type="button" onClick={handleSigntOUt}>
        Sign Out
      </button>
    </div>
  );
}
