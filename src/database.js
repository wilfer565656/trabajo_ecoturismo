const mysql =require('mysql');
const {promisify}=require('util')
const Connection = require('mysql/lib/Connection');
const {database}= require('./keys');
const pool  = mysql.createPool(database);
pool.getConnection((err,connection)=>{
    if(err){
       if (err.code)
        console.log(err.code);
    }
    if (connection) connection.release();
       console.log('bd contada');
   return ;
    
} 
)
pool.query=promisify(pool.query);
module.exports = pool;