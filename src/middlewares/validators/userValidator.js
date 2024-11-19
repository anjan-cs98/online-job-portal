const responseLib = require("./../../libs/responseLib");
const Joi = require("joi");

/**User Register Schema  */
const registerValidateSchema = Joi.object({
  role_id: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

/***User Register schema Validate */
const isRegisterValidate = async (req, res, next) => {
  try {
    const value = await registerValidateSchema.validate(req.body);
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

/***User edit schema  */
const userEditValidateSchama = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  image: Joi.string().uri().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  current_salary: Joi.number().optional(),
  is_annually_monthly: Joi.string().valid("annually", "monthly").optional(),
  currency: Joi.string().optional(),
  resume: Joi.string().uri().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  education_details: Joi.array()
    .items(
      Joi.object({
        certification_degree_name: Joi.string().optional(),
        major: Joi.string().optional(),
        institute_name: Joi.string().optional(),
        starting_date: Joi.date().optional(),
        completion_date: Joi.date().optional(),
        percentage: Joi.number().min(0).max(100).optional(),
        cgpa: Joi.number().min(0).max(4).optional(),
      })
    )
    .optional(),
  experience_details: Joi.array()
    .items(
      Joi.object({
        is_current_job: Joi.boolean().optional(),
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional(),
        job_title: Joi.string().optional(),
        company_name: Joi.string().optional(),
        job_location_city: Joi.string().optional(),
        job_location_country: Joi.string().optional(),
        description: Joi.string().optional(),
      })
    )
    .optional(),
});

/*** User edit schema Validate  */
const isEditUserValidate = async (req, res, next) => {
  try {
    const value = await userEditValidateSchama.validate(req.body);
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

/****User login Schema  */
const loginValidateSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

/***User login Schema validate */
const isLoginUserValidate = async (req, res, next) => {
  try {
    const value = await loginValidateSchema.validate(req.body);
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
  registerValidate: isRegisterValidate,
  isEditUserValidate: isEditUserValidate,
  isLoginUserValidate: isLoginUserValidate,
};

console.log("user Validators functions  is ready to use");
