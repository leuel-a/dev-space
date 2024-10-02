import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {version} from '../../package.json'
import {Express, Request, Response} from 'express'
import {logger} from './logger'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dev Space API Documentation',
      version,
    },
  },
  failOnErrors: true,
  apis: ['./src/routes/*.ts', './src/schemas/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app: Express, port: number) => {
  // swagger ui
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  
  // swagger json
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  
  logger.info(`Docs available at http://localhost:${port}/api/docs`)
}

export default swaggerDocs
