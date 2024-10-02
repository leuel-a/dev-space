import {User} from '../models/users.model'
import {RegisterUserType} from '../schemas/users.schema'
import {where} from 'sequelize'

export const findUserByEmail = async (email: string) => {
  return await User.findOne({where: {email}})
}

export const findUserByUsername = async (username: string) => {
  return await User.findOne({where: {username}})
}

export const createUser = async ({email, password, username}: RegisterUserType['body']) => {
  return await User.create({
    email, password, username,
  })
}
