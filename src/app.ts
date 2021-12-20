import 'reflect-metadata'
import dotenv from 'dotenv'
// import path from 'path';
import express, { NextFunction, Response, Request }  from 'express'
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' })

// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/api')
})

export default app
