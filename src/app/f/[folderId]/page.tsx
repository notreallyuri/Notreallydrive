import DriveContents from "../../drive-content";
import { getCurrentParents, getFiles, getFolders } from "~/server/db/queries";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsed = parseInt(params.folderId);
  if (isNaN(parsed)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    getFolders(parsed),
    getFiles(parsed),
    getCurrentParents(parsed),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
