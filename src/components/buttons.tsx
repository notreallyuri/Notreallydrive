"use client";

import { UploadButton } from "@/components/uploadthing";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteFile } from "@/server/actions";
import { Button } from "./ui/button";
import type { File } from "@/types/file";
import { Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

export const DeleteFileButton = ({ file }: { file: File }) => {
  const navigate = useRouter();

  return (
    <Button
      size="icon"
      variant="ghost"
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
      className={cn(
        "ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90",
        "ut-button:w-32 ut-button:h-8 ut-button:ut-readying:bg-primary/80",
        "ut-uploading:ut-button:after:bg-white",
        "ut-allowed-content:hidden text-sm font-medium",
      )}
      content={{
        button({ isUploading }) {
          if (isUploading) return "Uplading";

          return (
            <>
              <Upload className="mr-1 size-4" /> Upload File
            </>
          );
        },
      }}
      endpoint="fileUploader"
      onClientUploadComplete={() => navigate.refresh()}
      input={{ folderId: currentFolderId }}
    />
  );
}
