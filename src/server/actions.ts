"use server";

import { and, eq, isNull } from "drizzle-orm";
import { db } from "./db";
import { files_table, folders_tables } from "./db/schema";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const deleteFile = async (id: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const utApi = new UTApi();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(and(eq(files_table.id, id), eq(files_table.ownerId, user.id)));

  if (!file) {
    return { error: "File not found" };
  }

  const utRes = await utApi.deleteFiles([file.key]);

  console.log(utRes);

  const dbRes = await db.delete(files_table).where(eq(files_table.id, id));

  console.log(dbRes);

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
};

export const updateFile = async (formData: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const utApi = new UTApi();
  const user = session?.user;

  const newName = formData.get("newName") as string;
  const currentId = formData.get("currentId") as string;

  if (!user) throw new Error("User not authenticated");

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, currentId), eq(files_table.ownerId, user.id)),
    );

  if (!file) throw new Error("File not found");

  await utApi.renameFiles({
    fileKey: file.key,
    newName,
  });

  await db
    .update(files_table)
    .set({ name: newName })
    .where(eq(files_table.id, currentId));

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));
};

export const createFolder = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const parent = formData.get("parent") as string;

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    throw new Error("User not authenticated");
  }

  await db.insert(folders_tables).values({ name, parent, ownerId: user.id });

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));
};

export const getRootFolderForUser = async (userId: string) => {
  const [folder] = await db
    .select()
    .from(folders_tables)
    .where(
      and(eq(folders_tables.ownerId, userId), isNull(folders_tables.parent)),
    );

  return folder;
};

export const createRootFolder = async (userId: string) => {
  const [folder] = await db
    .insert(folders_tables)
    .values({ name: "root", ownerId: userId })
    .returning();

  return folder;
};

export const updateFolder = async (formData: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const currentId = formData.get("currentId") as string;
  const newName = formData.get("newName") as string;

  if (!user) throw new Error("User not authenticated");

  const [folder] = await db
    .select()
    .from(folders_tables)
    .where(
      and(
        eq(folders_tables.id, currentId),
        eq(folders_tables.ownerId, user.id),
      ),
    );

  if (!folder) throw new Error("Folder not found");

  await db
    .update(folders_tables)
    .set({ name: newName })
    .where(eq(folders_tables.id, currentId));

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));
};
