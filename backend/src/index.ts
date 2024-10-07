import express from 'express'
import passport from 'passport'
import session from 'express-session'
import sequelize from './lib/sequelize'
import connectSessionSequelize from 'connect-session-sequelize'

// passport authentiaction strategies
import { env } from './lib/env'
import './strategies/local-strategy'

// import the routes
import authRouter from './routes/auth.routes'
import usersRouter from './routes/users.routes'

const app = express()
const SessionStore = connectSessionSequelize(session.Store)

app.use(express.json())
app.use(
  session({
    secret: env.SESSION_SECRET,
    store: new SessionStore({
      db: sequelize,
      table: 'sessions',
      tableName: 'sessions',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 60 * 60000 },
  }),
)

// setup passport for authentication
app.use(passport.initialize())
app.use(passport.session())

// set up the routes of the app
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

export default app
