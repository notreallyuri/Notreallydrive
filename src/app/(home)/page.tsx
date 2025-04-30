import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div>
      <div className="flex justify-between p-4 border-gray-300 border">
        <p>Hi!</p>

        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
