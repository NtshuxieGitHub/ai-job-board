import { defineConfig } from "drizzle-kit";
import { env } from "./src/data/env/server";

const DATABASE_URL = env.DATABASE_URL;
console.log(DATABASE_URL);
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
