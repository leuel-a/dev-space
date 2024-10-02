import {z} from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *        - confirmPassword
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@gmail.com
 *        username:
 *          type: string
 *          default: jane123
 *        password:
 *          type: string
 *          default: veryStrongPassword@123
 *        confirmPassword:
 *          type: string
 *          default: veryStrongPassword@123
 */
export const registerUserSchema = z.object({
  body: z.object({
    username: z.string().min(4, {message: 'Username must be a min of 4 characters'}),
    email: z.string().email({message: 'Email is not valid'}),
    password: z.string().min(8, {message: 'Password must have a min of 8 characters'}),
    confirmPassword: z.string(),
  }).refine(({confirmPassword, password}) => password === confirmPassword, {
    path: ['password'],
    message: 'Passwords do not match',
  }),
})

export type RegisterUserType = z.infer<typeof registerUserSchema>
