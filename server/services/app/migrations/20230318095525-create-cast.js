'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Casts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Movies",
          },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profilePict: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Casts');
  }
};