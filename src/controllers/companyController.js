/***ALL COMPANY RELATED API END POINTS  */
const checkLib = require("../libs/checkLib");
const passwordLib = require("../libs/passwordLib");
const responseLib = require("../libs/responseLib");
const tokenLib = require("../libs/tokenLib");
const Company = require("../models/companyModel");

/***---------- Register company--------------  */
const registerCompany = async (req, res) => {
  try {
    let companyInfo = await Company.findOne({ company_email: req.body.email });

    if (checkLib.isEmpty(companyInfo)) {
      let newCompany = new Company({
        role_id: req.body.role_id,
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        password: await passwordLib.hashPassword(req.body.password),
      });
      companyInfo = await newCompany.save();
      let response = responseLib.generate(
        0,
        `Successfully Register`,
        companyInfo
      );
      /***Generate Token */
      let gen_token = await tokenLib.generateToken({
        email: companyInfo.company_email,
      });
      //console.log(gen_token);
      return res.status(200).cookie("_token", gen_token).json(response);
    } else {
      let response = responseLib.generate(1, `Something went wrong`, {});
      return res.status(401).json(response);
    }
  } catch (error) {
    let response = responseLib.generate(1, `Error :${error.message}`, {});
    return res.status(401).json(response);
  }
};
/***---------------Login Company -------------------- */
const loginCompany = async (req, res) => {
  try {
    let companyInfo = await Company.findOne({
      company_email: req.body.company_email,
    });
    if (!checkLib.isEmpty(companyInfo)) {
      /***Verify password  */
      if (
        await passwordLib.verifyPassword(
          req.body.password,
          companyInfo.password
        )
      ) {
        /***Generate Token */
        let gen_token = await tokenLib.generateToken({
          email: companyInfo.company_email,
        });
        let response = responseLib.generate(0, `Succesfully login `, {});
        return res.status(200).cookie("_token", gen_token).json(response);
      } else {
        let response = responseLib.generate(0, `Wrong Credentials... `, {});
        return res.status(200).json(response);
      }
    } else {
      let response = responseLib.generate(1, `Something went wrong`, {});
      return res.status(401).json(response);
    }
  } catch (error) {
    let response = responseLib.generate(1, `Error :${error.message}`, {});
    return res.status(401).json(response);
  }
};

/**----------------Get Company by id ---------------- */
const getCompanyById = async (req, res) => {
  try {
    let companyById = await Company.findById({ _id: req.params._id });
    if (!checkLib.isEmpty(companyById)) {
      let response = responseLib.generate(0, `Success`, companyById);
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

/*** --------------Update details of a Company -------------- */
const updateCompany = async (req, res) => {
  try {
    // Find user by ID and update with new information from req.body
    const updatedCompany = await Company.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: req.body }, // Updates all fields provided in req.body
      { new: true, runValidators: true } // Returns updated document & runs schema validators
    );

    // Check if user was found and updated
    if (!updatedCompany) {
      const response = responseLib.generate(1, "Company not found", {});
      return res.status(404).json(response);
    }

    // Send successful response with updated user data
    const response = responseLib.generate(
      0,
      "Company  information updated successfully",
      updatedCompany
    );
    return res.status(200).json(response);
  } catch (error) {
    // Handle any errors that occur
    const response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(500).json(response);
  }
};
/***Company logout  */
const logout = async (req, res) => {
  try {
    const response = responseLib.generate(0, `Logout Successfull`, {});
    return res.status(200).cookie("_token", "", { maxAge: 0 }).json(response);
  } catch (error) {
    const response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(500).json(response);
  }
};

module.exports = {
  registerCompany: registerCompany,
  loginCompany: loginCompany,
  getCompanyById: getCompanyById,
  updateCompany: updateCompany,
  logout: logout,
};

console.log("Company controller  is ready  to use");
