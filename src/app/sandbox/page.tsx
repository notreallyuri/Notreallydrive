import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { files_table, folders_tables } from "~/server/db/schema";
import { mockFolders } from "~/lib/mock-data";

export default async function Sandbox() {
  const user = await auth();

  if (!user.userId) {
    throw new Error("User not authenticated");
  }

  const folders = await db
    .select()
    .from(folders_tables)
    .where(eq(folders_tables.ownerId, user.userId));

  console.log("Folders:", folders);

  return (
    <div>
      <form
        action={async () => {
          "use server";

          const user = await auth();

          if (!user.userId) {
            throw new Error("User not authenticated");
          }

          const rootFolder = await db
            .insert(folders_tables)
            .values({
              name: "root",
              ownerId: user.userId,
              parent: null,
            })
            .$returningId();

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));

          await db.insert(folders_tables).values(insertableFolders);
        }}
      >
        <button type="submit">Create file</button>
      </form>
    </div>
  );
}
