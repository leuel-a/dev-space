import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import session from 'express-session'
import authRouter from './routes/auth.routes'

const app = express()

app.use(passport.initialize())
app.use(bodyParser.json())
app.use('/api/auth', authRouter)

export default app