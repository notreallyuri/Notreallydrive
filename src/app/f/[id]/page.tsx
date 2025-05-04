import DriveContents from "./drive-content";
import { QUERIES } from "@/server/db/queries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function GoogleDriveClone(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const params = await props.params;

  const user = session?.user;

  if (!user) {
    return <div>Unauthorized</div>;
  }

  console.log("Params:", params);

  const [folders, files, parents, currentFolder] = await Promise.all([
    QUERIES.getFolders(params.id),
    QUERIES.getFiles(params.id),
    QUERIES.getCurrentParents(params.id),
    QUERIES.getFolderById(params.id),
  ]);

  if (!currentFolder || currentFolder.ownerId !== user.id) {
    return <div>Unauthorized</div>;
  }

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={params.id}
    />
  );
}
