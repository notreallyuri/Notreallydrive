import type { Config } from "drizzle-kit";
import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  tablesFilter: ["drive_tutorial_*"],
  dbCredentials: {
    host: env.DB_HOST,
    port: Number.parseInt(env.DB_PORT),
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    ssl: false,
  },
} satisfies Config;
