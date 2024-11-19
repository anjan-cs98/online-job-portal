const dbConfig = require("./dbConfig.json")[process.env.NODE_ENV || "dev"];
let appConfig = {};
appConfig.port = process.env.PORT || 3000;
appConfig.env = process.env.NODE_ENV || "dev";
appConfig.apiVersion = "/api/v1";
appConfig.sessionExpTime = 120 * 120;
appConfig.baseUrl = process.env.BASE_URL || "http://localhost:3000";
appConfig.db = {
  uri: "mongodb://localhost:27017/insta-job-project-2k24",
};

/**set User api config */
appConfig.user_api = {
  login: "user/login",
  register: "user/register",
};

/**Set Company api config */
appConfig.company_api = {};

module.exports = appConfig;
console.log(dbConfig);
console.log("App Config is ready   to use");
