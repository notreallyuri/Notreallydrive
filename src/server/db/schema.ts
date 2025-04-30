import {
  int,
  text,
  singlestoreTableCreator,
  index,
  bigint,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`
);

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text("owner_id").notNull(),
    // This is the userId of the owner of the file

    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_id_index").on(t.ownerId),
    ];
  }
);

export const folders_tables = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),

    ownerId: text("owner_id").notNull(),
    // This is the userId of the owner of the folder
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_id_index").on(t.ownerId),
    ];
  }
);
