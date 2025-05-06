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

export default async function GoogleDriveClone({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children?: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const resolvedParams = await params;

  const user = session?.user;

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const [folders, files, parents, currentFolder] = await Promise.all([
    QUERIES.getFolders(resolvedParams.id),
    QUERIES.getFiles(resolvedParams.id),
    QUERIES.getCurrentParents(resolvedParams.id),
    QUERIES.getFolderById(resolvedParams.id),
  ]);

  if (!currentFolder || currentFolder.ownerId !== user.id) {
    return <div>Unauthorized</div>;
  }

  return (
    <>
      <Navbar parents={parents} currentFolder={currentFolder} />
      <main className="p-4">
        <DriveContents
          files={files}
          folders={folders}
          currentFolderId={currentFolder.id}
        />
      </main>
    </>
  );
}
