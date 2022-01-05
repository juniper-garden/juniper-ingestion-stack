import { Consumer, EachBatchPayload } from 'kafkajs'
import queues from '../queues'

export async function startConsuming(consumer: Consumer) {
  console.log('consumer started')
  await consumer.connect()
  await consumer.subscribe({ topic: 'sensor-ingest', fromBeginning: true })

  consumer.on('consumer.crash', (e:any) => console.error('Consumer crashed', e?.payload?.error))
  consumer.on('consumer.disconnect', (e:any) => console.error('Consumer disconnected', e?.payload?.error)))
  consumer.on('consumer.network.request_timeout', (e:any) => console.error('Consumer network request timeout', e?.payload?.error)))

  await consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }: EachBatchPayload) => {
      const parsedData = []
      for (const message of batch.messages) {
        if (!isRunning() || isStale()) {
          console.log('consumer stopped running or isstale')
          break
        }
        console.log('consumer is running and here is the data', JSON.parse(message.value.toString()))

        parsedData.push(JSON.parse(message.value.toString()))
      }
      await queues.kafkaRecordsQueue.add(parsedData, {
        attempts: 2,
        removeOnComplete: true
      })
      console.log('made it passed adding to queue', parsedData)
      await heartbeat()
    }
  }).catch((err) => {
    console.error(err)
  })
}
