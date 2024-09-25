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
      console.log(data);
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
  const getquery = "select *  from register";
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

module.exports.getUserById = async (request, response) => {
  const connection = await db.conn();
  const { id } = request.params;

  const getquery = `select *  from register where id=${id}`;
  connection.query(getquery, (err, result) => {
    connection.release();
    if (err) {
      return response.status(400).json({
        message: "Some problem occured",err,
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

module.exports.getCount = async (request, response) => {
  const connection = await db.conn();

  const getquery = "SELECT COUNT(*) AS results_count FROM register";
  const getticketcount = "SELECT COUNT(*) AS ticket_count FROM ticket";
  const sumticket = "SELECT SUM(price) AS ticket_amount FROM ticket";

  try {
    const results = await Promise.all([
      new Promise((resolve, reject) => {
        connection.query(getquery, (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        });
      }),
      new Promise((resolve, reject) => {
        connection.query(getticketcount, (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        });
      }),
      new Promise((resolve, reject) => {
        connection.query(sumticket, (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        });
      }),
    ]);

    // Release connection
    connection.release();

    // Combine results into a single object
    const combinedResults = {
      results_count: results[0].results_count,
      ticket_count: results[1].ticket_count,
      ticket_amount: results[2].ticket_amount,
    };

    return response.status(200).json({
      message: "success",
      success: true,
      data: combinedResults,
    });
  } catch (err) {
    // Release connection in case of error
    connection.release();

    return response.status(400).json({
      message: "Some problem occurred: " + err.message,
      success: false,
    });
  }
};

module.exports.getCountById = async (request, response) => {
  const connection = await db.conn();
  const { id } = request.params;
  console.log(id);

  // Corrected the SQL query syntax
  const getticketcount = `SELECT COUNT(*) AS ticket_count FROM ticket WHERE user_id=${id}`;
  const sumticket = `SELECT SUM(price) AS ticket_amount FROM ticket WHERE user_id=${id}`; // Added WHERE keyword

  try {
    const results = await Promise.all([
      new Promise((resolve, reject) => {
        connection.query(getticketcount, (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        });
      }),
      new Promise((resolve, reject) => {
        connection.query(sumticket, (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        });
      }),
    ]);

    // Release connection
    connection.release();

    // Combine results into a single object
    const combinedResults = {
      ticket_count: results[0].ticket_count || 0, // Changed index to 0 to access correct result
      ticket_amount: results[1].ticket_amount || 0, // Ensured to handle null case
    };
    console.log(combinedResults);

    return response.status(200).json({
      message: "success",
      success: true,
      data: combinedResults,
    });
  } catch (err) {
    // Release connection in case of error
    connection.release();

    return response.status(400).json({
      message: "Some problem occurred: " + err.message,
      success: false,
    });
  }
};
