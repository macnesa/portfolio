import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express, { Application } from 'express'
import cors from 'cors'
import { Route } from './routes/index'

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Routes
app.use(Route.createRoutes());

// Start server
app.listen(port, () => {
  console.log(
    `
==========================================
♻️  MAC SPOTIFY SERVER launch on port ${port}
==========================================
    `
  )
})
