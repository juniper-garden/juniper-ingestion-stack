'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("SELECT create_hypertable('sensor_readings', 'timestamp');");
  },

  down: (queryInterface, Sequelize) => {
  }
};
