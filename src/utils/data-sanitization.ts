import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'
import omit from 'lodash/omit'
import _ from 'lodash/fp'

export function createHashOfDevicesByCustomerDeviceId(arr: any) {
  return mapValues(groupBy(arr, 'customer_device_id'),
                   (itt: any) =>  itt.map((item:any) => omit(item, 'customer_device_id')))
}

export function createHashOfReadingsBySensorName(arr: any) {
  return mapValues(groupBy(arr, 'name'),
                   (itt: any) =>  itt.map((item:any) => omit(item, 'name')))
}

function parseFloat0(str: string) {
  return Number(parseFloat(str).toFixed(0))
}

function parseArrayInt(arr: string[]) {
  return arr.map(parseFloat0)
}

export const sanitizeData = _.compose(parseArrayInt, mapValue)
// map values in object to float with precision 2
export function mapValue(arr: any[]) {
  return map(arr, 'value')
}

export const cleanSensorReadingsAndRemoveOutliers = _.compose(sanitizeData)

export function calculateAverage(arr: any) {
  return arr.reduce((a:any, b:any) => a + b, 0) / arr.length
}

export function filterOutliers(values: number[]) {
    // if value count is less than 15, not worth filtering

    // Then sort
  values.sort((a:number, b:number) => {
    return a - b
  })
    /* Then find a generous IQR. This is generous because if (values.length / 4)
     * is not an int, then really you should average the two elements on either
     * side to find q1.
     */
  const q1 = values[Math.floor((values.length / 4))]
    // Likewise for q3.
  const q3 = values[Math.ceil((values.length * (3 / 4)))]
  const iqr:number = q3 - q1
    // Then find min and max values
  const maxValue = q3 + iqr * 1.5
  const minValue = q1 - iqr * 1.5

    // Then filter anything beyond or beneath these values.
  const filteredValues = values.filter((x:number) => {
    return (x <= maxValue) && (x >= minValue)
  })

    // Then return
  return filteredValues.length ? filteredValues : values
}
