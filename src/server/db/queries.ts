import "server-only";

import { files_table, folders_tables } from "./schema";
import { asc, eq } from "drizzle-orm";
import { db } from ".";

export const QUERIES = {
  getFolders: (folderId: number) => {
    return db
      .select()
      .from(folders_tables)
      .where(eq(folders_tables.parent, folderId))
      .orderBy(asc(folders_tables.name));
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

  getFolderById: async (folderId: number) => {
    const folder = await db
      .select()
      .from(folders_tables)
      .where(eq(folders_tables.id, folderId));

    return folder[0];
  },
};

export const MUTATIONS = {
  createFile: async (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) => {
    return await db
      .insert(files_table)
      .values({ ...input.file, ownerId: input.userId });
  },
};
