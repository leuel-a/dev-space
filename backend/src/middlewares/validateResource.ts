import {AnyZodObject, ZodError} from 'zod'
import {Request, Response, NextFunction} from 'express'
import {logger} from '../utils/logger'

export const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    const e = error as ZodError
    logger.error(e)
    res.status(400).send(e.errors)
  }
}
