import { files_table, folders_tables } from "./schema";
import { eq } from "drizzle-orm";
import { db } from ".";

async function getFolders(folderId: number) {
  return await db
    .select()
    .from(folders_tables)
    .where(eq(folders_tables.parent, folderId));
}

async function getFiles(folderId: number) {
  return await db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, folderId));
}

async function getCurrentParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(folders_tables)
      .where(eq(folders_tables.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }

  return parents;
}

export { getFiles, getFolders, getCurrentParents };
