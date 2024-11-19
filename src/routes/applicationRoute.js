/* Job Related api route  */
const apiCofig = require("../../config/appConfig");
const applicationValidator = require("./../middlewares/validators/applicationValidator");
const applicationController = require("./../controllers/applicationController");
module.exports.setRouter = (app) => {
  const api_version = `${apiCofig.apiVersion}`;
  app.post(
    `${api_version}/job_application/apply/:_id`,
    applicationController.applyJob
  );
  app.get(
    `${api_version}/application/lists`,
    applicationController.getAppliedJobs
  );
};

console.log("Application route is ready  to use");
