import _ from 'lodash/fp'
import { IKinesisSensorPayload, IReading, SensorReading } from '../interfaces/sensor_reading'

export const kinesisTransformer = _.compose(_.flatten, MapSensorPayloadToReadings, kinesisPayloadTransformer)

export function kinesisPayloadTransformer(item:any) {
  return kinesisRecordTransformer(item.data)
}

export const kinesisRecordTransformer = _.compose(JSON.parse, toBase64)

// tslint:disable-next-line: function-name
export function MapSensorPayloadToReadings(payload: IKinesisSensorPayload): IReading[] {
  const readings: any = payload.readings
  return readings.map((x: SensorReading) => {
    return {
      customer_device_id: payload.id,
      name: x.name,
      value: x.value,
      unit: x.unit,
      timestamp: payload.timestamp
    }
  })
}

export function toBase64(data:any) {
  return Buffer.from(data, 'base64').toString('utf8')
}
