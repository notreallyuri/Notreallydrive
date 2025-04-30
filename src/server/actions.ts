"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table, folders_tables } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

export async function deleteFile(fileId: number) {
  const session = await auth();
  const utApi = new UTApi();

  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId))
    );

  if (!file) {
    return { error: "File not found" };
  }

  const utRes = await utApi.deleteFiles([file.key]);

  console.log(utRes);

  const dbRes = await db.delete(files_table).where(eq(files_table.id, fileId));

  console.log(dbRes);

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}

export async function createFolder(formData: FormData) {
  const name = formData.get("name") as string;
  const parent = parseInt(formData.get("parent") as string);

  const session = await auth();

  if (!session.userId) {
    throw new Error("User not authenticated");
  }

  await db
    .insert(folders_tables)
    .values({ name, parent, ownerId: session.userId });

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));
}
