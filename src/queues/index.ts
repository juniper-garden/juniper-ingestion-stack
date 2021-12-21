// tslint:disable-next-line: variable-name
const Queue = require('bull')
import { kinesisQueueProcessingService } from './kinesisQueueController'
import { outboundPostgresProcessingService } from './outboundController'
import { processKafkaQueueController } from './processKafkaQueueController'

interface Queues {
  kinsesisRecordsQueue: any,
  outboundSensorReadingQueue: any,
  kafkaRecordsQueue: any
}

const redisUrl = process.env.REDIS_URI || 'redis://127.0.0.1:6379'
// Define a queue
const kinsesisRecordsQueue: any = new Queue('kinesis_records_q', {
  redis: redisUrl
})

// Define a queue
const outboundSensorReadingQueue: any = new Queue('outbound_pg_q', {
  redis: redisUrl
})

// Define a queue
const kafkaRecordsQueue: any = new Queue('kafka_records_q', {
  redis: redisUrl
})

kinsesisRecordsQueue.process(kinesisQueueProcessingService)
outboundSensorReadingQueue.process(outboundPostgresProcessingService)
kafkaRecordsQueue.process(processKafkaQueueController)

const exportables: Queues = {
  kinsesisRecordsQueue,
  outboundSensorReadingQueue,
  kafkaRecordsQueue
}

export default exportables
