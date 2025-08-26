import { Kysely, sql } from 'kysely';
import type { DB } from '../types/db'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('spotify_accounts')
    .addColumn('user_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('cascade'))
    .addColumn('spotify_id', 'text', (col) => col.notNull().unique())
    .addColumn('refresh_token', 'text')
    .addColumn('access_token', 'text')
    .addColumn('expires_in', 'timestamp')
    .addColumn('display_name', 'text')
    .addColumn('avatar_url', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable('spotify_accounts').execute()
}