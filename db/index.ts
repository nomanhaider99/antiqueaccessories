import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import * as schema from "./schema";

declare global {
  var pgClient: Sql | undefined;
}

let client: Sql;

if (!globalThis.pgClient) {
  globalThis.pgClient = postgres(process.env.DATABASE_URL!, { max: 10 });
}

client = globalThis.pgClient;

export const db = drizzle(client, { schema });
