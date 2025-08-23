import type { Kysely } from 'kysely'
import type { UmzugStorage, MigrationParams } from 'umzug'
import type { DB } from '../types/db'
import { sql } from 'kysely'

export class PgStorage implements UmzugStorage {
  constructor(private db: Kysely<DB>) {}

  async logMigration({ name }: MigrationParams<unknown>): Promise<void> {
    await this.db
      .insertInto('migrations') // hardcoded table name
      .values({ name, run_on: sql`now()` })
      .execute()
  }

  async unlogMigration({ name }: MigrationParams<unknown>): Promise<void> {
    await this.db
      .deleteFrom('migrations')
      .where('name', '=', name)
      .execute()
  }

  async executed(): Promise<string[]> {
    const rows = await this.db
      .selectFrom('migrations')
      .select('name')
      .execute()

    return rows.map((row) => row.name)
  }
}

