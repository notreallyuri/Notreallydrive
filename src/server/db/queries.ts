import "server-only";

import { files_table, folders_tables } from "./schema";
import type { File, Folder } from "~/types/file";
import { eq } from "drizzle-orm";
import { db } from ".";

export const QUERIES = {
  getFolders: (folderId: number) => {
    return db
      .select()
      .from(folders_tables)
      .where(eq(folders_tables.parent, folderId));
  },

  getFiles: (folderId: number) => {
    return db
      .select()
      .from(files_table)
      .where(eq(files_table.parent, folderId));
  },

  getCurrentParents: async (folderId: number) => {
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

export const MUTATIONS = {
  createFile: async (input: { file: Omit<File, "id">; userId: string }) => {
    return await db.insert(files_table).values({ ...input.file, parent: 1 });
  },
};
