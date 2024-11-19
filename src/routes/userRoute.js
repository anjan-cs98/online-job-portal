/***------------USER RELATED API----------**/
const apiCofig = require("./../../config/appConfig");
const userController = require("../controllers/userController");
const userValidators = require("./../middlewares/validators/userValidator");

module.exports.setRouter = (app) => {
  const api_version = `${apiCofig.apiVersion}`;
  app.post(
    `${api_version}/user/register`,
    userValidators.registerValidate,
    userController.register
  );
  app.post(
    `${api_version}/user/editinfo/:userId`,
    userValidators.isEditUserValidate,
    userController.editUserInfo
  );

  app.post(
    `${api_version}/user/login`,
    userValidators.isLoginUserValidate,
    userController.login
  );

  app.get(`${api_version}/user/logout`, userController.logout);
};

console.log("User router  is ready  to use");
