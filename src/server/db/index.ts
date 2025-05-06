import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";

const client = postgres(env.DATABASE_URL, {
  max: 20,
  idle_timeout: 30000,
  connect_timeout: 2000,
  ssl: false,
});

export const db = drizzle(client);

process.on("SIGINT", async () => {
  console.log("Shutting down database connections...");
  await client.end();
  process.exit(0);
});
