import { Job } from 'bull'
import SensorReading from '../models/sensor-reading'

export async function outboundPostgresProcessingService(job: Job, done: Function) {
  try {
    await SensorReading.bulkCreate(job.data)
    done()
  } catch (e) {
    done(new Error(e))
  }
}
