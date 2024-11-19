const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./companyModel");
const jobSchema = new Schema({
  posted_by: { type: String },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: Company }, // company id
  title: { type: String },
  job_type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
  },
  created_date: { type: Date, default: Date.now },
  job_description: { type: String },
  is_active: { type: Boolean },

  skill_set: [{ type: String }],

  skill_level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Expert"],
  },

  job_location: {
    street_address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String },
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
console.log("Job Model is ready to use");
