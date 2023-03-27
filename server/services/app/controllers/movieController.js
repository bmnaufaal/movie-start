"use strict";
const { Op } = require("sequelize");
const generateSlug = require("../helpers/generateSlug");
const { Movie, Genre, Cast, sequelize } = require("../models");
const redis = require("../config/redis");

class MovieController {
  static async findAll(req, res, next) {
    try {
      const movieCache = await redis.get("app:movies");
      if (movieCache) {
        console.log(JSON.parse(movieCache));
        res.json(JSON.parse(movieCache));
      } else {
        const movies = await Movie.findAll({
          order: [["id", "ASC"]],
          include: [
            {
              model: Genre,
              attributes: ["id", "name"],
            },
            {
              model: Cast,
              attributes: ["id", "movieId", "name", "profilePict"],
            },
          ],
        });
        await redis.set("app:movies", JSON.stringify(movies));
        res.status(200).json(movies);
      }
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
    console.log(req.body);
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
        authorId,
      } = req.body;

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
      await redis.del("app:movies");
      res.status(201).json({
        message: "Success create movie",
        createdMovie: createdMovie,
      });
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
      await redis.del("app:movies");
      res.status(200).json({
        message: `${foundMovie.title} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        castsId,
        castsName,
        castsPicture,
      } = req.body;
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw { name: "MovieNotFound" };
      }
      let updatedMovie = await Movie.update(
        {
          title: title,
          slug: generateSlug(title),
          synopsis: synopsis,
          trailerUrl: trailerUrl,
          imgUrl: imgUrl,
          rating: rating,
          genreId: genreId,
          castsName: castsName,
          castsPicture: castsPicture,
        },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(updatedMovie);

      if (castsName.length === castsId.length) {
        for (let index = 0; index < castsName.length; index++) {
          await Cast.update(
            {
              name: castsName[index],
              profilePict: castsPicture[index],
            },
            {
              where: {
                movieId: id,
                id: castsId[index],
              },
            }
          );
        }
      }

      await t.commit();
      await redis.del("app:movies");
      res.status(200).json({
        message: `${foundMovie.title} success to edit`,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = MovieController;
