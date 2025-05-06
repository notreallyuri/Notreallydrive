import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { MUTATIONS, QUERIES } from "@/server/db/queries";
import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    blob: {
      maxFileSize: "512MB",
      maxFileCount: 9999,
    },
  })
    .input(
      z.object({
        folderId: z.string(),
      }),
    )
    .middleware(async ({ input }) => {
      const session = await auth.api.getSession({ headers: await headers() });

      const user = session?.user;

      if (!user) throw new UploadThingError("Unauthorized");

      const folder = await QUERIES.getFolderById(input.folderId);
      if (!folder) throw new UploadThingError("Folder not found");

      if (folder.ownerId !== user.id)
        throw new UploadThingError("Unauthorized");

      return { userId: user.id, parentId: input.folderId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      await MUTATIONS.createFile({
        file: {
          name: file.name,
          size: file.size,
          url: file.ufsUrl,
          key: file.key,
          type: file.type,
          parent: metadata.parentId,
        },
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
