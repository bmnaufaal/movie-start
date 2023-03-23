"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie, {
        foreignKey: "genreId",
      });
    }
  }
  Genre.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Genre name should not be null",
          },
          notEmpty: {
            msg: "Genre name should not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Genre",
    }
  );
  return Genre;
};
