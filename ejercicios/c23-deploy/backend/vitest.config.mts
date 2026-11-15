import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const databaseUrl =
    env.DATABASE_URL_LOCAL ??
    `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@localhost:${env.POSTGRES_PORT ?? "5432"}/${env.POSTGRES_DB}`;

  return {
    test: {
      environment: "node",
      env: {
        ...env,
        NODE_ENV: "test",
        JWT_SECRET: "test-secret-c21",
        DATABASE_URL: databaseUrl,
      },
      exclude: ["**/node_modules/**", "**/dist/**", "**/*.db.test.ts"],
    },
  };
});
