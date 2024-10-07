import { Router } from 'express'
import passport from 'passport'

import { validateResource } from '../middlewares/validateResource'
import { loginUserHandler, registerUserHandler } from '../handlers/auth.handlers'
import { loginUserSchema, registerUserSchema } from '../schemas/users.schema'

const router = Router()

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Registers a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterUserInput'
 *    responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/register', validateResource(registerUserSchema), registerUserHandler)

/**
 * @openapi
 * /api/auth/login/password:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Login a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginUserInput'
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: Unauthorized
 *      400:
 *        description: Bad request
 */
router.post('/login/password', validateResource(loginUserSchema), passport.authenticate('local'), loginUserHandler)

router.post('/logout')

export default router
