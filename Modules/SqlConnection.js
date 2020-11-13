const mysql = require('mysql');   

exports.sqlCon = mysql.createConnection({
    host: "192.168.56.103", 
    user: "ReactMuscuServer", 
    password: "GoMuscu2020", 
    database: "ReactMuscu", 
    multipleStatements: true,
}); 