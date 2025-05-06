import DriveContents from "./drive-content";
import { QUERIES } from "@/server/db/queries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Navbar } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createFolder } from "@/server/actions";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FileUploadButton } from "@/components/buttons";

export default async function GoogleDriveClone(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const params = await props.params;

  const user = session?.user;

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const [folders, files, parents, currentFolder] = await Promise.all([
    QUERIES.getFolders(params.id),
    QUERIES.getFiles(params.id),
    QUERIES.getCurrentParents(params.id),
    QUERIES.getFolderById(params.id),
  ]);

  if (!currentFolder || currentFolder.ownerId !== user.id) {
    return <div>Unauthorized</div>;
  }

  return (
    <>
      <Navbar parents={parents} />

      <main className="space-y-4 p-4">
        <div className="flex w-full justify-end gap-4">
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

                <input type="hidden" name="parent" value={params.id} />

                <DialogFooter className="mt-2">
                  <DialogClose asChild>
                    <Button type="submit">Create</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <DriveContents
          files={files}
          folders={folders}
          currentFolderId={params.id}
        />
      </main>
    </>
  );
}
