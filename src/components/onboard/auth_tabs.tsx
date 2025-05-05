"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { SignUp } from "./signup";
import { SignIn } from "./signin";

export function AuthTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "signin";
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <Tabs defaultValue={tab} onValueChange={handleTabChange} className="w-100">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
        <TabsTrigger value="signin">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <SignIn />
          </CardContent>
          <div className="flex items-center justify-center gap-4">
            <div className="h-0.25 w-30 bg-black/25 dark:bg-white/50" />
            or
            <div className="h-0.25 w-30 bg-black/25 dark:bg-white/50" />
          </div>
          <CardFooter className="grid grid-cols-2 gap-6">
            <Button
              className="w-full cursor-pointer"
              variant={"outline"}
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/redirect",
                });
              }}
            >
              Github
            </Button>

            <Button
              className="w-full cursor-pointer"
              variant={"outline"}
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "discord",
                  callbackURL: "/redirect",
                });
              }}
            >
              Discord
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
