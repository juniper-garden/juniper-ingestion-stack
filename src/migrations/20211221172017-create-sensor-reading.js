'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensor_readings', {
      customer_device_id: {
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          allowNull: false
      },
      timestamp: {
        primaryKey: true,
        type: Sequelize.DATE
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sensor_readings');
  }
};