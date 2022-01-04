const { Kafka } = require('kafkajs')

let kafka:any = {}
const brokers = process.env.KAFKA_BROKERS.split(',')
console.log('brokers', brokers)
// Create the client with the broker list
if (process.env.USE_KAFKA) {
  kafka = new Kafka({
    brokers: ['157.245.114.98:9092'],
    clientId: 'juniper-ingest-client'
  })
}

export default kafka
