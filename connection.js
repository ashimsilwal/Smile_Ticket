const mysql=require("mysql2")
const dotenv = require('dotenv');
dotenv.config();
const connection=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    connectionLimit :200,
    port:process.env.DB_PORT  
}); 
connection.getConnection((err,con)=>{
    if (!err){
    console.log("Connect Successfull")
    }
    else{
        console.log("error",err);
    } 
});

module.exports=connection;