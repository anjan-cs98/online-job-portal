const responseLib = require("../../libs/responseLib");
const Joi = require("joi");

/***Job Posting validation Scheam  */
const jobValidationSchema = Joi.object({
  posted_by: Joi.string().required(),
  company_id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates ObjectId format
    .messages({
      "string.pattern.base": "company_id must be a valid ObjectId",
    }),

  title: Joi.string().required(),

  job_type: Joi.string()
    .valid("Full-time", "Part-time", "Contract", "Temporary", "Internship")
    .required()
    .messages({
      "any.only":
        "job_type must be one of [Full-time, Part-time, Contract, Temporary, Internship]",
    }),
  created_date: Joi.date().default(() => new Date()),
  job_description: Joi.string().required(),
  is_active: Joi.boolean().required(),
  skill_set: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "skill_set must include at least one skill",
  }),

  skill_level: Joi.string()
    .valid("Beginner", "Intermediate", "Expert")
    .required()
    .messages({
      "any.only": "skill_level must be one of [Beginner, Intermediate, Expert]",
    }),

  job_location: Joi.object({
    street_address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required(),
  }).required(),
  applications: Joi.array().items(
    Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .optional() // Validate each application ID as ObjectId
  ),
});
/***Isjob-validation schema  */
const isValidationJob = async (req, res, next) => {
  try {
    const value = await jobValidationSchema.validate(req.body);
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

/***Is Job  Id schema   */
const IdSchema = Joi.object({
  _id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates ObjectId format
    .messages({
      "string.pattern.base": "_id must be a valid ObjectId",
    }),
});

/*** Is job id validate  */
const isIdValidate = async (req, res, next) => {
  try {
    const value = await IdSchema.validate(req.params);
    if (value.hasOwnProperty("error")) {
      throw new Error(value.error);
    } else {
      next();
    }
  } catch (error) {
    console.log("Error ");
    let response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(410).json(response);
  }
};

/*** is job keyword validation schema  */
// const jobKeywordValidationSchema = Joi.object({
//   keyword: Joi.string().required(),
// });

/*** Is job keyword  validate  */
// const isJobValidateByKeyword = async (req, res, next) => {
//   try {
//     const value = await jobKeywordValidationSchema.validate(req.query || "");
//     if (value.hasOwnProperty("error")) {
//       throw new Error(value.error);
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log("Error ");
//     let response = responseLib.generate(1, `Error: ${error.message}`, {});
//     return res.status(410).json(response);
//   }
// };

module.exports = {
  isValidationJob: isValidationJob,
  isIdValidate: isIdValidate,
  //isJobValidateByKeyword: isJobValidateByKeyword,
};

console.log("Job Validation schema is ready  to use");
