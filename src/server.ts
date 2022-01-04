require('dotenv').config()
import app, { attemptDBConnect } from './app'
import kafka from './kafka/kafka'
import { startConsuming } from './services/kafkaSensorConsumer'

const PORT = process.env['PORT'] || 8000

/**
 * Start Express server.
 */
const server = app.listen(PORT, () => {
  attemptDBConnect()
  console.log(
    '⚡️[server]: Server is running at https://localhost:%d in %s mode',
    PORT,
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

if (process.env.USE_KAFKA) {
  setupKafka()
  async function setupKafka() {
    const producer = kafka.producer()
    const consumer = kafka.consumer({
      groupId: 'sensor-ingest-group',
      retry: {
        initialRetryTime: 10 * 1000,
        retries: 10
      },
      heartbeatInterval: 10 * 1000
    })
    await producer.connect()

    app.set('kafka_producer', producer)
    startConsuming(consumer)
  }
}

if (process.env.USE_SOCKETS) {
  const io = require('socket.io')(server)
  app.set('socketio', io)
}

export default server
