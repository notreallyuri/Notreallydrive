import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { ViewToggle } from "./ViewToggle";
import { createFolder, getRootFolderForUser } from "@/server/_actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { FileUploadButton } from "../buttons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
  currentFolder,
}: {
  parents: { id: string; name: string }[];
  currentFolder: { id: string; name: string };
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  console.log(currentFolder);

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
        <div className="inline-flex gap-4">
          <ViewToggle />
          <FileUploadButton currentFolderId={currentFolder.id} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus />
                Create Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Folder</DialogTitle>
              </DialogHeader>
              <form action={createFolder} className="space-y-4">
                <Label htmlFor="name" className="font-medium">
                  Folder Name
                </Label>
                <Input name="name" id="name" required />

                <input type="hidden" name="parent" value={currentFolder.id} />

                <DialogFooter className="mt-2">
                  <DialogClose asChild>
                    <Button type="submit">Create</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hover:bg-muted mr-4 inline-flex items-center gap-2 rounded p-1">
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
          <DropdownMenuContent className="w-44">
            <DropdownMenuItem>Edit profile</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
