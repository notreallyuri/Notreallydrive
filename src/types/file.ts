import type { files_table, folders_tables } from "~/server/db/schema";

export type File = typeof files_table.$inferSelect;
export type Folder = typeof folders_tables.$inferSelect;
