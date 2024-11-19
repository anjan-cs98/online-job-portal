const responseLib = require("../../libs/responseLib");
const Joi = require("joi");

const applicationValidationSchema = Joi.object({
  job_id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates ObjectId format
    .messages({
      "string.pattern.base": "_id must be a valid ObjectId",
    }),
  applicant_id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates ObjectId format
    .messages({
      "string.pattern.base": "_id must be a valid ObjectId",
    }),
  status: Joi.string()
    .valid("pending", "accepted", "rejected")
    .default("pending"), // Optional field with default value
});

const isApplicationValidate = async (req, res, next) => {
  let job_id = req.params._id;
  let applicant_id = req.body.id;

  console.log("Application Validate ");
  console.log(job_id);
  console.log(applicant_id);

  try {
    const value = await applicationValidationSchema.validate(req.body);
    if (value.hasOwnProperty("error")) {
      throw new Error(value.error);
    } else {
      next();
    }
  } catch (error) {
    let response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(410).json(response);
  }
};

module.exports = {
  isApplicationValidate: isApplicationValidate,
};

console.log("Application validator is ready to use");
