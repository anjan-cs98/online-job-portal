const responseLib = require("../../libs/responseLib");
const Joi = require("joi");

/*Company Registration Validation*/

/**User Register Schema  */
const registerValidateSchema = Joi.object({
  role_id: Joi.number().required(),
  company_name: Joi.string().required(),
  company_email: Joi.string().required(),
  password: Joi.string().required(),
});

/***Company Register schema Validate */
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

/*** Company update schema  */
const companyUpdateValidationSchema = Joi.object({
  company_name: Joi.string().required().messages({
    "string.empty": "Company name is required",
  }),
  company_email: Joi.string().email().optional().messages({
    "string.email": "Invalid email format",
  }),
  profile_description: Joi.string().optional().max(500).messages({
    "string.max": "Profile description should not exceed 500 characters",
  }),
  business_stream_name: Joi.string().optional(),
  establishment_date: Joi.date().optional().less("now").messages({
    "date.less": "Establishment date must be in the past",
  }),
  company_website_url: Joi.string().uri().optional().messages({
    "string.uri": "Invalid URL format",
  }),
  company_logo: Joi.string().optional(),
});

/***Company update schema validation  */

const isCompanyUpdateValidation = async (req, res, next) => {
  try {
    const value = await companyUpdateValidationSchema.validate(req.body);
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

/****Company login Schema  */
const loginValidateSchema = Joi.object({
  company_email: Joi.string().required(),
  password: Joi.string().required(),
});

/***Company  login Schema validate */
const isLoginCompanyValidate = async (req, res, next) => {
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

/***Is company Id schema   */
const companyGetByIdSchema = Joi.object({
  _id: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates ObjectId format
    .messages({
      "string.pattern.base": "_id must be a valid ObjectId",
    }),
});

/*** Is company id validate  */
const isCompanyValidateById = async (req, res, next) => {
  try {
    const value = await companyGetByIdSchema.validate(req.params);
    console.log("Valid object id ");
    console.log(value);
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

module.exports = {
  isRegisterValidate: isRegisterValidate,
  isCompanyUpdateValidation: isCompanyUpdateValidation,
  isLoginCompanyValidate: isLoginCompanyValidate,
  isCompanyValidateById: isCompanyValidateById,
};

console.log("Company Validators functions  is ready to use");
