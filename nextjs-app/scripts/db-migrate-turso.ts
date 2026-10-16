/**
 * Applies any not-yet-applied prisma/migrations/*\/migration.sql to the Turso
 * database (Prisma's CLI can't talk to libsql:// itself). Run after creating a
 * new migration locally:   npm run db:migrate:turso
 * Reads TURSO_DATABASE_URL / TURSO_AUTH_TOKEN from the environment or .env.turso.
 */
import { createClient } from "@libsql/client";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { config } from "dotenv";

config({ path: ".env.turso", quiet: true });

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) throw new Error("TURSO_DATABASE_URL is not set.");
  const db = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

  await db.execute("CREATE TABLE IF NOT EXISTS _applied_migrations (name TEXT PRIMARY KEY, appliedAt TEXT NOT NULL)");
  const done = new Set((await db.execute("SELECT name FROM _applied_migrations")).rows.map((r) => String(r.name)));

  const dir = path.join(process.cwd(), "prisma", "migrations");
  const names = (await readdir(dir, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort();

  let applied = 0;
  for (const name of names) {
    if (done.has(name)) continue;
    const sql = await readFile(path.join(dir, name, "migration.sql"), "utf-8");
    await db.executeMultiple(sql);
    await db.execute({ sql: "INSERT INTO _applied_migrations (name, appliedAt) VALUES (?, ?)", args: [name, new Date().toISOString()] });
    console.log("applied", name);
    applied++;
  }
  console.log(applied ? `Done — ${applied} migration(s) applied.` : "Turso is up to date.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
