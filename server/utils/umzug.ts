import { db } from '../db'
import { Umzug } from 'umzug'
import path from 'path'
import { PgStorage } from './pgStorage'

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, '../migrations/*.ts'),
    resolve: ({ name, path: migrationPath }) => {
      const migration = require(migrationPath!)
      return {
        name,
        up: async () => migration.up(db),
        down: async () => migration.down(db),
      }
    },
  },
  context: db,
  storage: new PgStorage(db),
  logger: console,
})

export default umzug
