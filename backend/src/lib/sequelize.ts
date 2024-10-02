import {env} from './env'
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  logging: env.DB_LOGGING,
  dialect: "postgres",
})

export default sequelize
