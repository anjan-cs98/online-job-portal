/** All Application related API  end points  */
const checkLib = require("../libs/checkLib");
const responseLib = require("../libs/responseLib");
const Application = require("./../models/applicationModel");
const Job = require("./../models/jobModel");

// /** Apply Jobs  */

const applyJob = async (req, res) => {
  try {
    const { _id: jobId } = req.params; // Extract job ID from params
    const { _id: applicantId } = req.body; // Extract applicant ID from body

    // Check if the user already applied to this job
    const existingApplication = await Application.findOne({
      job_id: jobId,
      applicant_id: applicantId,
    });

    if (!checkLib.isEmpty(existingApplication)) {
      const response = responseLib.generate(1, `Job already applied.`, {});
      return res.status(400).json(response);
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (checkLib.isEmpty(job)) {
      const response = responseLib.generate(1, `Job not found.`, {});
      return res.status(404).json(response);
    }

    // Create a new application
    const newApplication = await Application.create({
      job_id: jobId,
      applicant_id: applicantId,
    });

    // Add the application to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();

    const response = responseLib.generate(
      0,
      `Job application successfully Submited`,
      {
        applicationId: newApplication._id,
      }
    );
    return res.status(201).json(response);
  } catch (error) {
    const response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(500).json(response);
  }
};

/***Get applied jobs  */
const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.body._id;
    const application = await Application.find({ applicant_id: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job_id",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company_id",
          options: { sort: { createdAt: -1 } },
        },
      });
    //console.log(application);
    if (checkLib.isEmpty(application)) {
      const response = responseLib.generate(1, `No Applications `, {});
      return res.status(404).json(response);
    }
    const response = responseLib.generate(1, `Success`, application);
    return res.status(200).json(response);
  } catch (error) {
    const response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(500).json(response);
  }
};

module.exports = {
  applyJob: applyJob,
  getAppliedJobs: getAppliedJobs,
};

console.log("Application controller is ready to use");
