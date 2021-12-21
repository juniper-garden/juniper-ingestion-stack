import { Job } from 'bull'
import { bulkInsertSensorData } from '../services/sensorData'

export async function outboundPostgresProcessingService(job: Job, done: Function) {
  try {
    await bulkInsertSensorData(job.data)
    done()
  } catch (e) {
    done(new Error(e))
  }
}
