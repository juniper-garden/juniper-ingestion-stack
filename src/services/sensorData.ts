import SensorReading from '../models/sensor-reading'

export async function bulkInsertSensorData(data: SensorReading[]) {
  if (process.env.USE_DB) {
    return SensorReading.bulkCreate(data).catch((err:any) => {
      console.error('error', err)
    })
  }
  return Promise.resolve()
}
