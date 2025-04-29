import { createPool, type Pool } from "mysql2";

import { env } from "~/env";

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ??
  createPool({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    ssl: {},
    maxIdle: 0,
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database connection error:", err);
});
