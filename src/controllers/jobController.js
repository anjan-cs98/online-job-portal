/****ALL JOB RELATED API ENDPOINTS */
const checkLib = require("../libs/checkLib");
const responseLib = require("../libs/responseLib");
const Job = require("../models/jobModel");

/** new Job Post  */

const postNewJob = async (req, res) => {
  try {
    let newJob = new Job(req.body);
    let PostJob = await newJob.save();
    let response = responseLib.generate(0, `Successfully Posted `, PostJob);
    return res.status(200).json(response);
  } catch (error) {
    let response = responseLib.generate(1, `Error :${error.message}`, {});
    return res.status(401).json(response);
  }
};

/**Get Particular job by id  */

const getJobById = async (req, res) => {
  try {
    let jobById = await Job.findById({ _id: req.params._id }).populate({
      path: "company_id",
    });
    if (!checkLib.isEmpty(jobById)) {
      let response = responseLib.generate(0, `Success`, jobById);
      return res.status(200).json(response);
    } else {
      let response = responseLib.generate(1, `Something went wrong`, {});
      return res.status(401).json(response);
    }
  } catch (error) {
    let response = responseLib.generate(1, `Error :${error.message}`, {});
    return res.status(401).json(response);
  }
};

/**Get All jobs by keyword search*/
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    //console.log(keyword);
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { job_description: { $regex: keyword, $options: "i" } },
      ],
    };
    // console.log("Gel all jobs ");
    // console.log(query);

    const jobs = await Job.find(query)
      .populate({
        path: "company_id",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    if (!checkLib.isEmpty(jobs)) {
      let response = responseLib.generate(0, `Success`, jobs);
      return res.status(200).json(response);
    } else {
      let response = responseLib.generate(1, `Something went wrong`, {});
      return res.status(401).json(response);
    }
  } catch (error) {
    let response = responseLib.generate(1, `Error :${error.message}`, {});
    return res.status(401).json(response);
  }
};

/**Get All job by company  */
const getCompanyPostedJob = async (req, res) => {
  try {
    const jobs = await Job.find({ company_id: req.params._id }).populate({
      path: "company_id",
      createdAt: -1,
    });
    // console.log(jobs);
    if (!checkLib.isEmpty(jobs)) {
      let response = responseLib.generate(0, `Success`, jobs);
      return res.status(200).json(response);
    } else {
      let response = responseLib.generate(1, `Something went wrong`, {});
      return res.status(401).json(response);
    }
  } catch (error) {
    let response = responseLib.generate(1, `Error :${error.message}`, {});
    return res.status(401).json(response);
  }
};

module.exports = {
  postNewJob: postNewJob,
  getAllJobs: getAllJobs,
  getJobById: getJobById,
  getCompanyPostedJob: getCompanyPostedJob,
};

console.log("Job controller is ready to use");
