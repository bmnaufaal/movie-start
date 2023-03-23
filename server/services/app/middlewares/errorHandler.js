function errorHandler(error, req, res, next) {
  let status = "";
  let message = "";

  switch (error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      error = error.errors[0].message;
      message = error;
      break;
    case "InvalidEmail":
      status = 400;
      message = "Email is required";
      break;
    case "InvalidPassword":
      status = 400;
      message = "Password is required";
      break;
    case "InvalidCredentials":
      status = 401;
      message = "Invalid email/password";
      break;
    case "JsonWebTokenError":
    case "InvalidAccessToken":
      status = 401;
      message = "Invalid token";
      break;
    case "Unauthenticated":
      status = 401;
      message = "Unauthenticated";
      break;
    case "MovieNotFound":
      status = 404;
      message = "Movie not found";
      break;
    case "GenreNotFound":
      status = 404;
      message = "Genre not found";
      break;
    default:
      status = 500;
      message = "Internal server error";
      break;
  }

  console.log(error);
  res.status(status).json({
    message: message,
  });
}

module.exports = errorHandler;
