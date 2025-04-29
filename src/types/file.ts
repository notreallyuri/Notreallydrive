import { files, folders } from "~/server/db/schema";

export type File = typeof files.$inferSelect;
export type Folder = typeof folders.$inferSelect;