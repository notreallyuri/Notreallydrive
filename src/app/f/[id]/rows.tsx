import Link from "next/link";
import type { Folder, File } from "@/types/file";
import {
  File as FileIcon,
  Folder as FolderIcon,
  PencilLine,
} from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteFile, updateFile } from "@/server/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function DeleteFileDialog({ fileId }: { fileId: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteFile(fileId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function UpdateFileDialog({ fileId }: { fileId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Rename
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>Enter a new name for the file.</DialogDescription>
        </DialogHeader>
        <form action={updateFile} className="space-y-4">
          <input
            name="currentId"
            type="text"
            className="hidden"
            defaultValue={fileId}
          />
          <Input name="newName" />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Row(props: { folder?: Folder; file?: File }) {
  const { folder, file } = props;

  const formatBytes = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  if (folder) {
    return (
      <TableRow
        key={folder.id}
        className="grid grid-cols-12 items-center gap-4"
      >
        <TableCell className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="max-w-64 cursor-pointer truncate"
          >
            <Button variant="link">
              <FolderIcon className="mr-3" size={20} />
              {folder.name}
            </Button>
          </Link>
        </TableCell>
        <TableCell />
        <TableCell />
      </TableRow>
    );
  }

  if (file) {
    return (
      <>
        <TableRow className="grid grid-cols-12 items-center gap-4">
          <TableCell className="col-span-6 flex items-center">
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="max-w-120 cursor-pointer truncate"
            >
              <Button variant="link">
                <FileIcon className="mr-3" size={20} />
                {file.name}
              </Button>
            </a>
          </TableCell>
          <TableCell className="text-muted-foreground col-span-2 text-right">
            {file.type}
          </TableCell>
          <TableCell className="text-muted-foreground col-span-2 text-right">
            {formatBytes(file.size)}
          </TableCell>
          <TableCell className="col-span-2 flex justify-end pr-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <PencilLine />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <UpdateFileDialog fileId={file.id} />
                  <DropdownMenuItem onSelect={() => console.log("Download")}>
                    Download
                  </DropdownMenuItem>

                  <DeleteFileDialog fileId={file.id} />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </>
    );
  }

  return null;
}
