"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cast.belongsTo(models.Movie, {
        foreignKey: "movieId",
      });
    }
  }
  Cast.init(
    {
      movieId: DataTypes.INTEGER,
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Name should not be null",
          },
          notEmpty: {
            msg: "Name should not be empty",
          },
        },
      },
      profilePict: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cast",
    }
  );
  return Cast;
};
