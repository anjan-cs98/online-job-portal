/****Generate Token For User  &  Recruiter  */
const jwt = require("jsonwebtoken");
const shortid = require("short-unique-id");
const apiCofig = require("./../../config/appConfig");

/*** Generate Token  */
const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    const uid = new shortid({ length: 10 });
    const secrectKey = process.env.JWT_SECRET;
    try {
      let claims = {
        jwtid: uid.randomUUID(),
        iat: Date.now(),
        exp: Math.floor(Date.now() / 1000) + apiCofig.sessionExpTime,
        sub: "auth_token",
        data: data,
      };

      resolve(jwt.sign(claims, "privateKey"));
    } catch (error) {
      reject(error);
    }
  });
};

/***Verify Token  */
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "privateKey", function (err, decode) {
      if (err) {
        reject(err);
      } else {
        resolve(decode);
      }
    });
  });
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};

console.log("Generate token is ready to use");
