const mysql = require("mysql")
const mysql2 = require("mysql2/promise")
const pool = mysql.createPool({
    user : "root",
    password : "password",
    host : "localhost",
    database : "movies",
    port : 3306,
    connectionLimit : 20
})
const poolAsync = mysql2.createPool({
    user : "root",
    password : "password",
    host : "localhost",
    database : "movies",
    port : 3306,
    connectionLimit : 20
})
module.exports = {
    pool,
    poolAsync,
}