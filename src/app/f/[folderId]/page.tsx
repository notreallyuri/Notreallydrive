import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchemas,
} from "~/server/db/schema";
import DriveContents from "../../drive-content";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsed = parseInt(params.folderId);
  if (isNaN(parsed)) {
    return <div>Invalid folder ID</div>;
  }

  console.log("Folder ID:", params.folderId);

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsed));
  const folders = await db
    .select()
    .from(foldersSchemas)
    .where(eq(foldersSchemas.parent, parsed));

  return <DriveContents files={files} folders={folders} />;
}
