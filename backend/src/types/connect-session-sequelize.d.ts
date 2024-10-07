import { SessionData, Store } from 'express-session'
import { Sequelize, SyncOptions } from 'sequelize'

interface Data {
  [column: string]: any
}

interface SequelizeStoreOptions {
  db: Sequelize
  table?: string
  tableName?: string
  modelKey?: string
  extendDefaultFields?: (defaults: DefaultFields, session: any) => Data
  checkExpirationInterval?: number
  expiration?: number
}

declare class SequelizeStore extends Store {
  sync(options?: SyncOptions): void
  touch: (sid: string, data: any, callback?: (err: any) => void) => void
  stopExpiringSessions: () => void
  get(sid: string, callback: (err: any, session?: SessionData | null) => void): void
  set(sid: string, session: SessionData, callback?: (err?: any) => void): void
  destroy(sid: string, callback?: (err?: any) => void): void
}

interface SequelizeStoreConstructor {
  new (options: SequelizeStoreOptions): SequelizeStore
}

declare module 'connect-session-sequelize' {
  export default function (session: typeof Store): typeof SessionStore
}
