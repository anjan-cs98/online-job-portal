/* Job Related api route  */
const apiCofig = require("../../config/appConfig");
const jobValidator = require("../middlewares/validators/jobValidator");
const jobController = require("../controllers/jobController");

module.exports.setRouter = (app) => {
  const api_version = `${apiCofig.apiVersion}`;
  app.post(
    `${api_version}/job/post`,
    jobValidator.isValidationJob,
    jobController.postNewJob
  );
  app.get(
    `${api_version}/job/getbyId/:_id`,
    jobValidator.isIdValidate,
    jobController.getJobById
  );

  app.get(`${api_version}/job/getall`, jobController.getAllJobs);
  app.get(
    `${api_version}/job/getJobByCompany/:_id`,
    jobValidator.isIdValidate,
    jobController.getCompanyPostedJob
  );
};

console.log("Job route is ready  to use");
