const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
  role_id: {
    type: Number,
    ref: "Role", // Reference to the Role model
  },
  company_name: {
    type: String,
  },
  company_email: {
    type: String,
  },
  password: {
    type: String,
  },
  profile_description: {
    type: String,
  },
  business_stream_name: {
    type: String,
  },
  establishment_date: {
    type: Date,
  },
  company_website_url: {
    type: String,
  },
  company_logo: {
    type: String,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
