import { kinesisQueueProcessingService } from '../../src/queues/kinesisQueueController'
// write jest test for kinesisQueueProcessingService
import queues from '../../src/queues/index'

const fakeReading1 = { id:3, timestamp:1626359469, readings:[{ name:'temp', value:70.0001, unit:'F' }, { name:'humidity', value:40, unit:'%' }, { name:'pressure', value:1200, unit:'kPa' }] }

const fakeReading2 = { id:3, timestamp:1626359485, readings:[{ name:'temp', value:75.0001, unit:'F' }, { name:'humidity', value:40, unit:'%' }, { name:'pressure', value:1200, unit:'kPa' }] }

const fakePayload = {
  records: [
    {
      data: Buffer.from(JSON.stringify(fakeReading1)).toString('base64')
    },
    {
      data: Buffer.from(JSON.stringify(fakeReading2)).toString('base64')
    }
  ]
}

jest.mock('../../src/queues/index', () => {
  return {
    outboundSensorReadingQueue: {
      add: jest.fn()
    }
  }
})

describe('kinesisQueueProcessingService tests', () => {
  it('kinesisQueueProcessingService should be defined', async () => {
    expect(kinesisQueueProcessingService).toBeDefined()

    const func = await kinesisQueueProcessingService
    const done = jest.fn()
    const fakeJob = {
      data: fakePayload
    }
    await func(fakeJob, done)
    expect(done).toHaveBeenCalled()
    expect(queues.outboundSensorReadingQueue.add).toHaveBeenCalledWith([
      {
        customer_device_id: 3,
        name: 'temp',
        timestamp: 'Thu Jul 15 2021 14:31:25 GMT+0000',
        unit: 'F',
        value: '72.5'
      },
      {
        customer_device_id: 3,
        name: 'humidity',
        timestamp: 'Thu Jul 15 2021 14:31:25 GMT+0000',
        unit: '%',
        value: '40'
      },
      {
        customer_device_id: 3,
        name: 'pressure',
        timestamp: 'Thu Jul 15 2021 14:31:25 GMT+0000',
        unit: 'kPa',
        value: '1200'
      }
    ])
  })
})
