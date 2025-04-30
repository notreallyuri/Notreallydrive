import DriveContents from "./drive-content";
import { QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsed = parseInt(params.folderId);
  if (isNaN(parsed)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsed),
    QUERIES.getFiles(parsed),
    QUERIES.getCurrentParents(parsed),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsed}
    />
  );
}
