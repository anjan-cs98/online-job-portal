const jwt = require("jsonwebtoken");
const tokenLib = require("./../../libs/tokenLib");
const responseLib = require("./../../libs/responseLib");
const checkLib = require("./../../libs/checkLib");

/***User Authentication   */
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies._token;
    if (!token) {
      const response = responseLib.generate(1, `User not Authenticated`, {});
      return res.status(401).json(response);
    }
    const decode = await tokenLib.verifyToken(token);
    if (!checkLib.isEmpty(decode)) {
      const response = responseLib.generate(1, `Invalid token`, {});
      return res.status(401).json(response);
    }
    req.decode = decode;
    next();
  } catch (error) {
    const response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(500).json(response);
  }
};

module.exports = {
  isAuthenticated: isAuthenticated,
};

console.log("Authenticated  function is ready  to use");
