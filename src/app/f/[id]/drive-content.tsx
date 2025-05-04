import type { File, Folder } from "@/types/file";
import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFolder } from "@/server/actions";
import { FileUploadButton } from "@/components/buttons";

export default async function DriveContents(props: {
  files: File[];
  folders: Folder[];
  parents: Folder[];
  currentFolderId: string;
}) {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/f/1"
              className="mr-2 cursor-pointer text-gray-300 hover:text-blue-500"
            >
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="cursor-pointer text-gray-300 hover:text-blue-500"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}

            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <FileUploadButton currentFolderId={props.currentFolderId} />
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Folder</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create folder</DialogTitle>
              <DialogDescription>Create a new directory</DialogDescription>
            </DialogHeader>
            <form action={createFolder} className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Folder Name
              </Label>
              <Input name="name" id="name" required />

              <input
                type="hidden"
                name="parent"
                value={props.currentFolderId}
              />

              <DialogFooter className="mt-2">
                <DialogClose asChild>
                  <Button type="submit">Create</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
