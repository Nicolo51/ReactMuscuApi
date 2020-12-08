const mysql = require('mariadb/callback');   

exports.sqlCon = mysql.createPool({
    host: "localhost",
    user: "admin@ReactMuscu", 
    database: "ReactMuscu", 
    multipleStatements: true,
}); 
