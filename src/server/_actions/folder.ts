"use server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../db";
import { folders_tables } from "../db/schema";
import { auth } from "../better-auth";
import { cookies, headers } from "next/headers";

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
