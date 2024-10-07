import _ from 'lodash'
import { logger } from '../utils/logger'
import { Request, Response } from 'express'
import { RegisterUserType } from '../schemas/users.schema'

// services
import { createUser, findUserByEmail } from '../services/users.services'

export const registerUserHandler = async (req: Request<unknown, unknown, RegisterUserType['body']>, res: Response) => {
  const emailExists = await findUserByEmail(req.body.email)
  if (emailExists) {
    res.status(409).send('Email already exists. Please provide another email.')
  }

  try {
    const user = await createUser(req.body)
    res.status(201).send(_.omit(user.toJSON(), ['password']))
  } catch (error) {
    logger.error(error)
    res.status(400).send('Unable to create user')
  }
}

export const loginUserHandler = (req: Request, res: Response) => {
  res.send('user registered successfully')
}

export const logoutUserHandler = (req: Request, res: Response) => {
  res.send('user registered successfully')
}
