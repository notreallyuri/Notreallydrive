"use client";

import type { File, Folder } from "@/types/file";
import { Row } from "./rows";

import { useViewStore } from "@/store/view";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DriveContents(props: {
  files: File[];
  folders: Folder[];
  currentFolderId: string;
}) {
  const { files, folders, currentFolderId } = props;
  const { view } = useViewStore();

  if (view === "grid") {
  }

  if (view === "list") {
    return (
      <Card className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-12 items-center">
              <TableHead className="col-span-6 flex items-center pl-12">
                Name
              </TableHead>
              <TableHead className="col-span-2 flex items-center justify-end text-right">
                Type
              </TableHead>
              <TableHead className="col-span-2 flex items-center justify-end text-right">
                Size
              </TableHead>
              <TableHead className="col-span-2 flex items-center justify-end pr-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {folders.map((folder) => (
              <Row key={folder.id} folder={folder} />
            ))}
            {files.map((file) => (
              <Row key={file.id} file={file} />
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return null;
}
