const { Validator } = require("node-input-validator");
// const connection = require("../../connection");
const { request } = require("express");
const db = require("../../constant/db");

//Field validation of user registration
module.exports.registerUser = async (request) => {
  const connection = await db.conn();
  const validateUser = await new Validator(request.body, {
    email: "required|email",
    full_name: "required",
    password: "required|minLength:8",
    confirmpassword: "required|minLength:8|same:password",
    // phone_number: 'required|numeric',
    // account_type: "required"
  });
  console.log("valid", validateUser);
  // Custom validation
  validateUser.addPostRule(async (provider) => {
    const checkEmail = await email(provider.inputs.email, connection);

    // const checkNumber = await phonenumber(provider.inputs.phone_number)
    if (checkEmail) {
      provider.error("email", "custom", "Email already exist");
    }
  });
  return validateUser;
};
//check unique email
function email(email, connection) {
  return new Promise((resolve, reject) => {
    const query = `SELECT email FROM register WHERE email = '${email}' `;
    connection.query(query, (error, results) => {
      connection.release();
      if (error) {
        resolve("some problem occur");
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

//Field validation of user login
module.exports.loginUser = (request) => {
  const validateLogin = new Validator(request.body, {
    email: "required|email",
    password: "required|minLength:8",
  });
  return validateLogin;
};
