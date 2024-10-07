import { InferAttributes } from 'sequelize'
import { User as SequelizeUser } from '../models/users.model'

declare global {
  namespace Express {
    // eslint-disable-next-line
    interface User extends InferAttributes<SequelizeUser, { omit: 'password' }> {}
  }
}
