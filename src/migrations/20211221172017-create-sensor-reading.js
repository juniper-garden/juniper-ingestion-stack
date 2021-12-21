'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sqDataTypes = withDateNoTz(Sequelize);
    await queryInterface.createTable('sensor_readings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      customer_device_id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
      },
      timestamp: {
        allowNull: false,
        type: sqDataTypes.DATE_NO_TZ
      },
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    await queryInterface.addIndex('sensor_readings', ['customer_device_id'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sensor_readings');
  }
};