const mongoose = require("mongoose");
const Role = require("./roleModel");
mongoose.set("strictQuery", false);
const Schema = mongoose.Schema;
const userSchema = new Schema({
  role_id: { type: Number, ref: Role, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true },
  image: { type: String },
  // Seeker Profile fields
  first_name: { type: String },
  last_name: { type: String },
  current_salary: { type: Number },
  is_annually_monthly: {
    type: String,
    enum: ["annually", "monthly"],
  },
  currency: { type: String },
  resume: { type: String }, // URL or path to the resume file
  skills: [{ type: String }],

  // Education Details - Array of embedded objects
  education_details: [
    {
      certification_degree_name: { type: String },
      major: { type: String },
      institute_name: { type: String },
      starting_date: { type: Date },
      completion_date: { type: Date },
      percentage: { type: Number },
      cgpa: { type: Number },
    },
  ],

  // Experience Details - Array of embedded objects
  experience_details: [
    {
      is_current_job: { type: Boolean },
      start_date: { type: Date },
      end_date: { type: Date },
      job_title: { type: String },
      company_name: { type: String },
      job_location_city: { type: String },
      job_location_country: { type: String },
      description: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
console.log("User Model is ready to use");
