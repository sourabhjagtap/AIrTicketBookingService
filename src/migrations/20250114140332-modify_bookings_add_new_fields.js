/**
 * Command to create this file: 
 * PS C:\developer\backendfiles\AirlineManagementProject\BookingService\src> npx sequelize migration:create --name modify_bookings_add_new_fields
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'Bookings',
      'noOfSeats',
      {
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 1
      }
    );

    await queryInterface.addColumn(
      'Bookings',
      'totalCost',
      {
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
      }
    );

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Bookings','noOfSeats');
    await queryInterface.removeColumn('Booking', 'totalCost');
  }
};


/**
 * Command to migrate the db:
 * PS C:\developer\backendfiles\AirlineManagementProject\BookingService\src> npx sequelize db:migrate
 */