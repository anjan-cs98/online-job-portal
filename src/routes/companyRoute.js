/***------------COMPANY  RELATED API----------**/
const companyController = require("../controllers/companyController");
const companyValidators = require("../middlewares/validators/companyValidator");

const apiCofig = require("./../../config/appConfig");

module.exports.setRouter = (app) => {
  const api_version = `${apiCofig.apiVersion}`;
  app.post(
    `${api_version}/company/register`,
    companyValidators.isRegisterValidate,
    companyController.registerCompany
  );
  app.post(
    `${api_version}/company/login`,
    companyValidators.isLoginCompanyValidate,
    companyController.loginCompany
  );
  app.post(
    `${api_version}/company/update/:_id`,
    companyValidators.isCompanyValidateById,
    companyValidators.isCompanyUpdateValidation,
    companyController.updateCompany
  );
  app.get(
    `${api_version}/company/getbyId/:_id`,
    companyValidators.isCompanyValidateById,
    companyController.getCompanyById
  );
  app.get(`${api_version}/company/logout`, companyController.logout);
};

console.log("Company  router  is ready  to use");
