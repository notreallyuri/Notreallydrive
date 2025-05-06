import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ViewToggle } from "./ViewToggle";
import { getRootFolderForUser } from "@/server/actions";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

function FolderPath({ parents }: { parents: { id: string; name: string }[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parents.map((parent, index) => (
          <React.Fragment key={parent.id}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/f/${parent.id}`}>
                {parent.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < parents.length - 1 && (
              <BreadcrumbSeparator className="text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export async function Navbar({
  parents,
}: {
  parents: { id: string; name: string }[];
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user;
  const rootFolder = await getRootFolderForUser(user?.id ?? "");

  return (
    <header className="flex w-dvw items-center justify-between border-b px-4 py-2 shadow-md">
      <div className="inline-flex items-center gap-4">
        <h1 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
          NotreallyDrive
        </h1>
        <div className="bg-primary/15 h-8 w-0.5 rounded" />
        <Link href={`/f/${rootFolder?.id}`} className="text-muted-foreground">
          <p className="text-sm font-medium">My Drive</p>
        </Link>
        <div className="bg-primary/15 h-8 w-0.5 rounded" />
        <FolderPath parents={parents} />
      </div>

      <div className="inline-flex items-center gap-8">
        <div className="inline-flex gap-2">
          <ViewToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="mr-4 inline-flex gap-2">
              <div className="text-right select-none">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-muted-foreground text-xs">{user?.email}</p>
              </div>
              <Avatar>
                <AvatarImage src={user?.image ?? ""} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>test</DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
