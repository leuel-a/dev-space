import {cleanEnv, str, num, bool} from 'envalid'

export const env = cleanEnv(process.env, {
  DB_HOST: str(),
  DB_PORT: num(),
  DB_NAME: str(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_DIALECT: str(),
  PORT: num(),
  DB_LOGGING: bool(),
  SALT_ROUNDS: num(),
  SESSION_SECRET: str(),
})
