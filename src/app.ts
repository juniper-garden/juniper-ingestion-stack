import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import queues from './queues'
import sequelize from './db'
import SensorReading from './models/sensor-reading'
import { sensorIngestPoint } from './controllers/sensorIngestController'
const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter')
const { ExpressAdapter } = require('@bull-board/express')

const serverAdapter = new ExpressAdapter()

createBullBoard({
  serverAdapter,
  queues: [
    new BullAdapter(queues.kinsesisRecordsQueue),
    new BullAdapter(queues.outboundSensorReadingQueue),
    new BullAdapter(queues.kafkaRecordsQueue)
  ]
})

const app = express()
serverAdapter.setBasePath('/admin/queues')

if (process.env.NODE_BULL_UI) {
  app.use('/admin/queues', serverAdapter.getRouter())
}

app.use(bodyParser.json({
  limit: 10000
}))

app.use(cors())

export async function attemptDBConnect() {
  try {
    if (!process.env.NODE_BULL_PERSIST_SUCCESS) {
      await queues.kinsesisRecordsQueue.clean(1000)
      await queues.kafkaRecordsQueue.clean(1000)
      await queues.outboundSensorReadingQueue.clean(1000)
    }
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}

app.get('/', (req, res) => {
  SensorReading.findAll().then((sensorReadings: any) => {
    res.send(sensorReadings)
  })
})

app.post('/sensor-ingest', sensorIngestPoint)

app.post('/test-put', async (req, res) => {
  const { body } = req
  res.status(200).json(body)
})

export default app
