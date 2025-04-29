import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchemas,
} from "~/server/db/schema";
import DriveContents from "../../drive-content";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchemas)
      .where(eq(foldersSchemas.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }

  return parents;
}

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsed = parseInt(params.folderId);
  if (isNaN(parsed)) {
    return <div>Invalid folder ID</div>;
  }

  console.log("Folder ID:", params.folderId);

  const filesPromise = db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsed));
    
  const foldersPromise = db
    .select()
    .from(foldersSchemas)
    .where(eq(foldersSchemas.parent, parsed));

  const parentsPromise = getAllParents(parsed);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
