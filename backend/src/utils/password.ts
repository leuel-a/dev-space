import bcrypt from 'bcrypt'
import {env} from '../lib/env'

export const hashPassword = async (password: string) => {
  const saltRounds = await bcrypt.genSalt(env.SALT_ROUNDS)
  return await bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (passwordHash: string, candidatePassword: string) => {
  return await bcrypt.compare(passwordHash, candidatePassword)
}

