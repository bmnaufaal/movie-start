const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) throw { name: "InvalidAccessToken" };
    let payload = verifyToken(access_token);
    if (!payload) throw { name: "InvalidAccessToken" };
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
