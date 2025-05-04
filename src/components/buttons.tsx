"use client";
import { UploadButton } from "@/components/uploadthing";
import { useRouter } from "next/navigation";
import { deleteFile } from "@/server/actions";
import { Button } from "./ui/button";
import type { File } from "@/types/file";
import { Trash2Icon } from "lucide-react";

export const DeleteFileButton = ({ file }: { file: File }) => {
  const navigate = useRouter();

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className={"cursor-pointer"}
      onClick={() => {
        deleteFile(file.id);
        navigate.refresh();
      }}
    >
      <Trash2Icon />
    </Button>
  );
};

export function FileUploadButton({
  currentFolderId,
}: {
  currentFolderId: string;
}) {
  const navigate = useRouter();

  return (
    <UploadButton
      endpoint="fileUploader"
      onClientUploadComplete={() => navigate.refresh()}
      input={{ folderId: currentFolderId }}
    />
  );
}
