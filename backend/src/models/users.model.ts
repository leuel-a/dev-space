import sequelize from '../lib/sequelize'
import {
  Sequelize,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize'
import {hashPassword, comparePassword} from '../utils/password'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare email: string
  declare username: string
  declare password: string

  // timestamps
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await comparePassword(this.password, candidatePassword)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await hashPassword(user.password)
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password) {
          user.password = await hashPassword(user.password)
        }
      },
    },
  },
)
