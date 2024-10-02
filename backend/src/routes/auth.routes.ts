import {Router} from 'express'
import {registerUserHandler} from '../handlers/auth.handlers'
import {validateResource} from '../middlewares/validateResource'
import {registerUserSchema} from '../schemas/users.schema'

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
 *
 */
router.post('/login')

router.post('/logout')

export default router
