"use server"
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { files_table } from "../db/schema";
import { UTApi } from "uploadthing/server";
import { auth } from "../better-auth";
import { cookies, headers } from "next/headers";

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

  await utApi.deleteFiles([file.key]);

  await db.delete(files_table).where(eq(files_table.id, id));

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
