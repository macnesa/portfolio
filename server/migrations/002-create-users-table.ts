import { Kysely, sql } from 'kysely'
import type { DB } from '../types/db'

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('username', 'text', (col) => col.notNull())
    .addColumn('spotify_id', 'text', (col) => col.notNull().unique())
    .addColumn('avatar', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute()
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable('users').execute()
}
