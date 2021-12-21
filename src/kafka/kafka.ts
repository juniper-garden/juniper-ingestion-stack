const { Kafka } = require('kafkajs')

let kafka:any = {}
const brokers = process.env.KAFKA_BROKERS.split(',')
// Create the client with the broker list
if (process.env.USE_KAFKA) {
  kafka = new Kafka({
    brokers,
    clientId: 'juniper-ingest-client'
  })
}

export default kafka
