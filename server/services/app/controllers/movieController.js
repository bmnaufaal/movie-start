"use strict";
const { Movie, Genre, User, Cast, sequelize } = require("../models");

class MovieController {
  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: Genre,
            attributes: ["id", "name"],
          },
          {
            model: User,
            as: "Author",
            attributes: ["id", "username", "email", "role"],
          },
          {
            model: Cast,
            attributes: ["id", "movieId", "name", "profilePict"],
          },
        ],
      });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      let foundMovie = await Movie.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["id", "name"],
          },
          {
            model: User,
            as: "Author",
            attributes: ["id", "username", "email", "role"],
          },
          {
            model: Cast,
            attributes: ["id", "movieId", "name", "profilePict"],
          },
        ],
      });
      if (!foundMovie) {
        throw { name: "MovieNotFound" };
      }
      res.status(200).json(foundMovie);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        castsName,
        castsPicture,
      } = req.body;
      const authorId = req.user.id;

      let createdMovie = await Movie.create(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          authorId,
        },
        { transaction: t }
      );

      if (castsName) {
        for (let index = 0; index < castsName.length; index++) {
          await Cast.create(
            {
              movieId: createdMovie.id,
              name: castsName[index],
              profilePict: castsPicture[index],
            },
            { transaction: t }
          );
        }
      }

      await t.commit();
      res.status(201).json(createdMovie);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw { name: "MovieNotFound" };
      }
      let deletedMovie = await Movie.destroy({
        where: {
          id: id,
        },
      });
      console.log(deletedMovie);
      res.status(200).json({
        message: `${foundMovie.title} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw { name: "MovieNotFound" };
      }
      let updatedMovie = await Movie.update(
        {
          title: title,
          synopsis: synopsis,
          trailerUr: trailerUrl,
          imgUrl: imgUrl,
          rating: rating,
          genreId: genreId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(updatedMovie);

      res.status(200).json({
        message: `${foundMovie.title} success to edit`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
