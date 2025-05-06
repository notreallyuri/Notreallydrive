import { redirect } from "next/navigation";
import { getRootFolderForUser, createRootFolder } from "@/server/actions";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function RedirectPage() {
  const session = await auth.api.getSession({ headers: await headers() });


  console.log("Session:", session);

  if (!session) {
    return redirect("/auth?tabs=signin");
  }

  const rootFolder = await getRootFolderForUser(session.user.id);

  if (!rootFolder) {
    const newRootFolder = await createRootFolder(session.user.id);

    return redirect(`/f/${newRootFolder?.id}`);
  }

  return redirect(`/f/${rootFolder.id}`);
}
