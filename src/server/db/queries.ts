import "server-only";

import { files_table, folders_tables } from "./schema";
import { eq } from "drizzle-orm";
import { db } from ".";

export const QUERIES = {
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(folders_tables)
      .where(eq(folders_tables.parent, folderId));
  },

  getFiles: function (folderId: number) {
    return db
      .select()
      .from(files_table)
      .where(eq(files_table.parent, folderId));
  },

  getCurrentParents: async function (folderId: number) {
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
  },
};
