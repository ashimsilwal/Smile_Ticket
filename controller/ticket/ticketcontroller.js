// const connection = require("../../connection")
const validUser = require("../../validation/customer/authvalidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../../constant/db");

module.exports.gettickets = async (request, response) => {
  const connection = await db.conn();
 console.log(request.params.id)
  const getquery = `SELECT CONCAT('http://localhost:8080/', ticket.payment_proof) AS ticketpayment_proof, ticket.*,register.* FROM ticket LEFT JOIN register ON register.id = ticket.user_id where ticket.user_id=${request.params.id}`;
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

module.exports.storeTicket = async (request, response) => {
 
  const connection = await db.conn();
  const data = request.body;
  data.start_date = new Date();
  if (data.package === "1 Month") {
    let endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    data.end_date = endDate;
    data.price = 1200;
  }
  if (data.package === "3 Month") {
    let endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
    data.end_date = endDate;
    data.price = 3240;
  }
  if (data.package === "6 Month") {
    let endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 6);
    data.end_date = endDate;
    data.price = 6400;
  }
  if(request.file)
  {

    data.payment_proof=request.file.filename
  }
  else{
    data.payment_proof=null;
  }

  console.log(data);
  
  connection.query("insert into ticket SET ?", data, (error, results) => {
    connection.release();
    console.log(results.insertId)
    if (error) {
      return response.status(400).json({
        message: "Some problem occured" + error,
        success: false,
      });
    } else {
      return response.status(200).json({
        message: "success",
        success: true,
         insertedId: results.insertId
      });
    }
  });
};


module.exports.getticketById = async (request, response) => {
  const connection = await db.conn();
  const getquery = "SELECT CONCAT('http://localhost:8080/', ticket.payment_proof) AS ticketpayment_proof, ticket.*,register.* FROM ticket LEFT JOIN register ON register.id = ticket.user_id where ticket.id="+request.params.id;
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
