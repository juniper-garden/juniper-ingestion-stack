import { kinesisPayloadTransformer, MapSensorPayloadToReadings } from '../src/utils/helpers'

const fakePayload = {
  records: [
        { data: 'eyJpZCI6MywidGltZXN0YW1wIjoxMTExNzExNDUyMDAsInJlYWRpbmdzIjpbeyJuYW1lIjoidGVtcCIsInZhbHVlIjo3MC4wMDAxLCJ1bml0IjoiRiJ9LHsibmFtZSI6Imh1bWlkaXR5IiwidmFsdWUiOjQwLCJ1bml0IjoiJSJ9LHsibmFtZSI6InByZXNzdXJlIiwidmFsdWUiOjEyMDAsInVuaXQiOiJrUGEifV19' },
        { data: 'eyJpZCI6MywidGltZXN0YW1wIjoxMTExNzExNDUyMDAsInJlYWRpbmdzIjpbeyJuYW1lIjoidGVtcCIsInZhbHVlIjo3MC4wMDAxLCJ1bml0IjoiRiJ9LHsibmFtZSI6Imh1bWlkaXR5IiwidmFsdWUiOjQwLCJ1bml0IjoiJSJ9LHsibmFtZSI6InByZXNzdXJlIiwidmFsdWUiOjEyMDAsInVuaXQiOiJrUGEifV19' }
  ]
}

describe('test', () => {
  it('should return true', () => {
    const processed: any = fakePayload.records.map(kinesisPayloadTransformer)
    expect(processed).toHaveLength(2)
    const transformed = processed.map(MapSensorPayloadToReadings).flat()
    expect(transformed).toHaveLength(6)
  })
})
