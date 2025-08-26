import { Kysely, sql } from 'kysely'
import type { DB } from '../types/db'

export async function up(db: Kysely<any>): Promise<void> { 
    await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`uuid_generate_v4()`))
    .addColumn('username', 'text', (col) => col.notNull())
    .addColumn('email', 'text')
    .addColumn('password_hash', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable('users').execute()
}
