const mysql = require('mariadb/callback');   

exports.sqlCon = mysql.createConnection({
    host: "localhost",
    user: "admin@ReactMuscu", 
    database: "ReactMuscu", 
    multipleStatements: true,
}); 
