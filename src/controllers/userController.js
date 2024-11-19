/****ALL USER RELATED API ENDPOINTS */
const checkLib = require("../libs/checkLib");
const responseLib = require("../libs/responseLib");
const tokenLib = require("../libs/tokenLib");
const User = require("../models/userModel");
const passwordLib = require(".././libs/passwordLib");

const register = async (req, res) => {
  try {
    let userInfo = await User.findOne({ email: req.body.email });
    if (checkLib.isEmpty(userInfo)) {
      let newUser = new User({
        role_id: req.body.role_id,
        email: req.body.email,
        password: await passwordLib.hashPassword(req.body.password),
      });
      userInfo = await newUser.save();
      let response = responseLib.generate(0, `Successfully Register`, userInfo);
      /***Generate Token */
      let gen_token = await tokenLib.generateToken({ email: userInfo.email });
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

/****-------------User login --------*****/
/*..........................................*/
const login = async (req, res) => {
  try {
    let userInfo = await User.findOne({ email: req.body.email });
    if (!checkLib.isEmpty(userInfo)) {
      /***Verify password  */
      if (
        await passwordLib.verifyPassword(req.body.password, userInfo.password)
      ) {
        /***Generate Token */
        let gen_token = await tokenLib.generateToken({ email: userInfo.email });
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

/** ---------------User Info edit ------------ */
//....................................................//

const editUserInfo = async (req, res) => {
  try {
    // Find user by ID and update with new information from req.body
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body }, // Updates all fields provided in req.body
      { new: true, runValidators: true } // Returns updated document & runs schema validators
    );

    // Check if user was found and updated
    if (!updatedUser) {
      const response = responseLib.generate(1, "User not found", {});
      return res.status(404).json(response);
    }

    // Send successful response with updated user data
    const response = responseLib.generate(
      0,
      "User information updated successfully",
      updatedUser
    );
    return res.status(200).json(response);
  } catch (error) {
    // Handle any errors that occur
    const response = responseLib.generate(1, `Error: ${error.message}`, {});
    return res.status(500).json(response);
  }
};

/***User logout  */
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
  register: register,
  editUserInfo: editUserInfo,
  login: login,
  logout: logout,
};
console.log("User Controller is ready  to use");
