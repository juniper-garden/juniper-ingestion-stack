import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.

class SensorReading extends Model<any> {}

SensorReading.init({
  // Model attributes are defined here
  customer_device_id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  timestamp: {
    primaryKey: true,
    type: DataTypes.DATE
  },
  name: {
    type: DataTypes.STRING
  },
  value: {
    type: DataTypes.STRING
  },
  unit: {
    type: DataTypes.STRING
  }
},                 {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'SensorReading',
  tableName: 'sensor_readings', // We need to choose the model name
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

sequelize.models.SensorReading.removeAttribute('id')

// the defined model is the class itself
console.log(SensorReading === sequelize.models.SensorReading) // true

export default SensorReading
