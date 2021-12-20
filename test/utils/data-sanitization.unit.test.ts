import { sanitizeData, cleanSensorReadingsAndRemoveOutliers, createHashOfDevicesByCustomerDeviceId, createHashOfReadingsBySensorName } from '../../src/utils/data-sanitization'

const mockData = [
    { value: '12.5050' },
    { value: '17.1111111' },
    { value: '1141.9888' }
]
describe('Data sanitization utils, unit tests', () => {
  it('sanitizeData: Given an array of readings, return the values as numbers with fixed precision at 2', () => {
    const results = sanitizeData(mockData)
    expect(results).toEqual([13, 17, 1142])
  })

  it('remove outliers, should sanitize data and strip outliers', () => {
    const fakeData = Array.from({ length: 40 }, () => {
      return {
        value: `${Math.floor(Math.random() * (30 - 10) + 10)}`
      }
    })
    const outliersIncluded = [...fakeData, { value: '1000.00' }, { value: '100001.00' }, { value: '0' }, { value: '-100' }, { value: '-1' }]
    const results = cleanSensorReadingsAndRemoveOutliers(outliersIncluded)
    expect(typeof results).toBe('number')
  })

  it('should group all readings by customer device id', () => {
    const fakeDeviceData = [
      {
        customer_device_id: 3,
        name: 'pressure',
        value: 1200,
        unit: 'kPa',
        timestamp: 111171145200
      },
      {
        customer_device_id: 3,
        name: 'pressure',
        value: 1500,
        unit: 'kPa',
        timestamp: 111171145202
      },
      {
        customer_device_id: 3,
        name: 'temperature',
        value: 71,
        unit: 'F',
        timestamp: 111171145202
      },
      {
        customer_device_id: 3,
        name: 'temperature',
        value: 72,
        unit: 'F',
        timestamp: 111171145202
      },
      {
        customer_device_id: 4,
        name: 'temperature',
        value: 1200,
        unit: 'kPa',
        timestamp: 111171145200
      }
    ]
    const results = createHashOfDevicesByCustomerDeviceId(fakeDeviceData)
    expect(Object.keys(results)).toHaveLength(2)

    for (const key in results) {
      results[key] = createHashOfReadingsBySensorName(results[key])
    }
    expect(results['3'].pressure).toHaveLength(2)
    expect(results['3'].temperature).toHaveLength(2)
    expect(results['4'].temperature).toHaveLength(1)
  })
})
