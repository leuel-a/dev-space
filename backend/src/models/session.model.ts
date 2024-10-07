import { DataTypes } from 'sequelize'
import sequelize from '../lib/sequelize'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

export class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
  declare sid: string
  declare data: string
  declare expires: Date

  // timestamps
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: true,
  },
)
