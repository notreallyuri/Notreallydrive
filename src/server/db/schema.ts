import {
  text,
  pgTableCreator,
  index,
  timestamp,
  integer,
  uuid,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `drive_tutorial_${name}`);

export const files_table = createTable(
  "files_table",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: text("owner_id").notNull(),

    name: text("name").notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
    key: text("file_key").notNull(),
    parent: text("parent_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [
      index("files_parent_index").on(t.parent),
      index("files_owner_id_index").on(t.ownerId),
    ];
  },
);

export const folders_tables = createTable(
  "folders_table",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    parent: text("parent_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [
      index("folders_parent_index").on(t.parent),
      index("folders_owner_id_index").on(t.ownerId),
    ];
  },
);

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
