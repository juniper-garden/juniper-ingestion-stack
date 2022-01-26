import {
  cleanSensorReadingsAndRemoveOutliers,
  createHashOfDevicesByCustomerDeviceId,
  createHashOfReadingsBySensorName
} from '../utils/data-sanitization'
import { kinesisTransformer } from '../utils/helpers'
import _ from 'lodash/fp'
import queues from '../queues'
import moment from 'moment'

export function kinesisQueueProcessingService(job: any, done: any) {
  const processed: any = job.data.records.map(kinesisTransformer).flat()
  const readingsMapped = createHashOfDevicesByCustomerDeviceId(processed)

  const finalBatchResults: any[] = []

  for (const key in readingsMapped) {
    readingsMapped[key] = createHashOfReadingsBySensorName(readingsMapped[key])

    for (const sensorName in readingsMapped[key]) {
      const sensorReadings = readingsMapped[key][sensorName]

      sensorReadings.forEach((reding:any) => {
        let dateTimeConversion = moment.utc(reding.timestamp * 1000).toString()
        if (moment.utc(reding.timestamp * 1000).format('YYYY') === '1970') {
          const currentDate = moment().startOf('day').utc()
          const utcConvertedDate = currentDate.add(reding.timestamp, 'seconds')
          if(utcConvertedDate.format('YYYY') !== '1970') {
            dateTimeConversion = utcConvertedDate.toString()
          }
        }

        finalBatchResults.push({
          customer_device_id: key,
          name: sensorName,
          value: parseFloat0(reding.value).toString(),
          unit: sensorReadings[0].unit,
          timestamp: dateTimeConversion
        })
      })
    }
  }

  queues.outboundSensorReadingQueue.add(finalBatchResults, {
    attempts: 2,
    removeOnComplete: true
  })
  done()
}

function parseFloat0(str: string) {
  return Number(parseFloat(str).toFixed(2))
}
