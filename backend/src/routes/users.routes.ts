import { Router } from 'express'
import { getUsers } from '../handlers/users.handlers'

const router = Router()

/**
 * @openapi
 * /api/users:
 *  get:
 *    tags:
 *      - User
 *    summary: Get all users
 *    description: Gets all the users from the database, only in dev mode
 *    responses:
 *      200:
 *        description: users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', getUsers)

export default router
