const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const debug = require('debug')('app')
const { PORT } = require('./config')
const bodyParser = require('body-parser')

const app = express()
require('./startup/db')()

const user = require('./modules/user/index')
const webhook = require('./modules/webhook/index')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  headers: true,
})

process.on('unhandledRejection', (err) => {
  debug(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  debug(err, 'Uncaught Exception thrown')
  process.exit(1)
})

app.use(limiter)
app.use(cors({ origin: '*' }))

app.use(
  '/api/v1/user',
  express.urlencoded({ extended: true, limit: '50mb' }),
  express.json({ limit: 52428800 }),
  user,
)
app.use('/api/v1/stripe', express.raw({ type: 'application/json' }), webhook)

app.listen(PORT, () => {
  console.log(`Web server is running ${PORT}`)
})
