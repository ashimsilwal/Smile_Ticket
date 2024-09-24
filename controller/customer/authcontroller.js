// const connection = require("../../connection")
const validUser = require("../../validation/customer/authvalidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../../constant/db");
const { ChecksumAlgorithm } = require("@aws-sdk/client-s3");
// api for register user
module.exports.register = async (request, response) => {

  
  const connection = await db.conn();
  //validation for user
  const validateUser = await validUser.registerUser(request);
  // console.log(validateUser);
  validateUser.check().then((matched) => {
    if (!matched) {
      return response.status(400).json({ errors: validateUser.errors });
    }
    // return false
    //password encryption using bcrypt
    bcrypt.hash(request.body.password, 10, function (error, hash_password) {
      if (error) {
        return response.status(400).json({
          message: "Some problem occured" + error,
          success: false,
        });
      }
      const data = request.body;
      console.log(data)
      data.password = hash_password;
      data.created_at = new Date();
      delete data.confirmpassword;

      // console.log("otp",otp)
      // Insert new user into database
      // return false
      connection.query("insert into register SET ?", data, (error, results) => {
        connection.release();
        // console.log(results)
        if (error) {
          return response.status(400).json({
            message: "Some problem occured" + error,
            success: false,
          });
        } else {
          return response.status(200).json({
            message: "success",
            success: true,
            email: data.email,
          });
        }
      });
    });
  });
};

//api for user login
module.exports.login = async (request, response) => {
  console.log("login");
  const connection = await db.conn();
  const validateLogin = await validUser.loginUser(request);
 
  validateLogin.check().then((matched) => {
    if (!matched) {
      return response.status(400).json({ errors: validateLogin.errors });
    }
    const loginData = request.body;
    const query = "SELECT * FROM register WHERE email = ?";
    
    connection.query(query, [loginData.email], async (error, result) => {
      connection.release();
      if (error) {
        
        return response.status(400).json({
          message: "Some problem occured" + error,
          success: false,
        });
      }
      if (!result.length) {
        return response.status(400).json({
          message: "Email not found",
          success: false,
        });
      }
      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        result[0].password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: result[0].id, email: result[0].email },
          process.env.SECRET_KEY
        );
        return response.status(200).json({
          message: "Login success",
          success: true,
          token: result[0].id,
        });
      } else {
        return response.status(400).json({
          message: "Invalid Email/Password",
          success: false,
        });
      }
    });
  });
};

module.exports.getusers = async (request, response) => {
  const connection = await db.conn();
  const getquery = "select *  from users";
  connection.query(getquery, (err, result) => {
    connection.release();
    if (err) {
      return response.status(400).json({
        message: "Some problem occured",
        success: false,
      });
    } else {
      return response.status(200).json({
        message: "success",
        success: true,
        data: result,
      });
    }
  });
};


module.exports.getCount = async (request, response) => {
  const connection = await db.conn();
  const getquery = "SELECT COUNT(*) AS results_count FROM register";
  connection.query(getquery, (err, result) => {
    connection.release();
    if (err) {
      return response.status(400).json({
        message: "Some problem occured".err,
        success: false,
      });
    } else {
      return response.status(200).json({
        message: "success",
        success: true,
        data: result[0],
      });
    }
  });
};
