import Link from "next/link";
import type { Folder, File } from "@/types/file";
import {
  File as FileIcon,
  Folder as FolderIcon,
  Trash2Icon,
} from "lucide-react";
import { DeleteFileButton } from "@/components/buttons";

export function FileRow(props: { file: File }) {
  "use client";
  const { file } = props;

  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex cursor-pointer items-center text-gray-100 hover:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">{"file"}</div>
        <div className="col-span-2 text-gray-400">{file.size}</div>
        <div className="col-span-2 flex justify-end text-gray-400">
          <DeleteFileButton file={file} />
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: { folder: Folder }) {
  const { folder } = props;

  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex cursor-pointer items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-2 text-gray-400" />
        <div className="col-span-2 text-gray-400" />
      </div>
    </li>
  );
}
