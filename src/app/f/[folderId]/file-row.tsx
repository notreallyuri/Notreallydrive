import Link from "next/link";
import type { Folder, File } from "~/types/file";
import {
  File as FileIcon,
  Folder as FolderIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import { DeleteFileButton } from "~/components/buttons";

export function FileRow(props: { file: File }) {
  const { file } = props;

  return (
    <li
      key={file.id}
      className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750"
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400 cursor-pointer"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">{"file"}</div>
        <div className="col-span-2 text-gray-400">{file.size}</div>
        <div className="col-span-2 text-gray-400 flex justify-end">
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
      className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750"
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 cursor-pointer hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-2 text-gray-400"></div>
        <div className="col-span-2 text-gray-400"></div>
      </div>
    </li>
  );
}
