import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user, account, verification } from "@/server/db/schema";
import { redis } from "./redis";
import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      verification,
    },
  }),
  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key);

      return JSON.stringify(value);
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },
  advanced: {
    cookiePrefix: "drive_tutorial",
  },
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.BASE_URL],
});
