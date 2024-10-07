import _ from 'lodash'
import { Request, Response } from 'express'

import { User } from '../models/users.model'

export const getUsers = async (req: Request, res: Response) => {
  console.log(req.session)
  const users = await User.findAll({})

  res.setHeader('Content-Type', 'application/json')
  res.send(users.map(user => _.omit(user.toJSON(), ['password'])))
}
