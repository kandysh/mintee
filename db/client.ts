import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create the PostgreSQL client
const client = postgres(process.env.DATABASE_URL || '', {
  prepare: false,
});

// Create and export the Drizzle database instance
export const db = drizzle(client, { schema });

export type Database = typeof db;
