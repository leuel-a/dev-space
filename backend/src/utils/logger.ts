import {env} from '../lib/env'
import {createLogger, format, transports} from 'winston'

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss',
    }),
    format.prettyPrint(),
  ),
  transports: [
    new transports.File({filename: '../logs/errors.log', level: 'error'}),
    new transports.File({filename: '../logs/app.log'}),
  ],
})

// logs to the console if the app is in development 
if (!env.isProduction) {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }))
}
