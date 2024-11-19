const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Define Schema
const Schema = mongoose.Schema;
const roleModelSchema = new Schema(
  {
    role_id: {
      type: Number,
      required: true,
      unique: true,
    },
    role_name: {
      type: String,
      required: true,
      enum: ["recruiter", "job_seeker"],
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleModelSchema);
console.log("Role Model is ready to use");
