import { Consumer, EachBatchPayload } from 'kafkajs'
import queues from '../queues'

export async function startConsuming(consumer: Consumer) {
  console.log('consumer started')
  await consumer.connect()
  await consumer.subscribe({ topic: 'sensor-ingest', fromBeginning: true })

  const startTime = Date.now()
  await consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({ batch, resolveOffset, heartbeat }: EachBatchPayload) => {
      const parsedData = []
      console.log('consumer is running')
      for (const message of batch.messages) {
        console.log('consumer is running and here is the data', JSON.parse(message.value.toString()))

        parsedData.push(JSON.parse(message.value.toString()))

        resolveOffset(message.offset)
        await heartbeat()
      }
      await queues.kafkaRecordsQueue.add(parsedData, {
        attempts: 2,
        removeOnComplete: true
      })
    }
  })
}
