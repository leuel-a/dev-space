require('dotenv').config()

import app from './index'
import {env} from './lib/env'
import {logger} from './utils/logger'
import sequelize from './lib/sequelize'
import swaggerDocs from './utils/swagger'

const PORT = env.PORT || 3000

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate()
        logger.info('Connection to the database is successful')
    } catch (error) {
        logger.error(`Unable to connect to the database: ${error}`)
        process.exit(1)
    }

    // synchronize models
    await sequelize.sync({force: true})
    
    // setup swagger documentation
    swaggerDocs(app, PORT as number)
    
    logger.info(`Server is running on port: ${PORT}`)
}) 