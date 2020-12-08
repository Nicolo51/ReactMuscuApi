const Log = require("../Modules/Log.js");
const ORM = require("../Modules/ORM.js");

exports.CreateUser =function(body, callback){
    const firstname = body.firstname;
    const lastname = body.lastname;
    const birthday = body.birthday;
    const email = body.email;
    const username = body.username;
    const password = body.password;

    if(firstname === undefined || lastname === undefined || birthday === undefined || email === undefined || username === undefined || password === undefined){
                return callback('{"Status":"Check arguments"}');
        }

        ORM.OrmParser.ExecuteInsertQuery("INSERT INTO `Users`(`firstname`, `lastname`, `birthday`, `email`, `username`, `password`) VALUES ('" + firstname + "', '" + lastname + "', '" + birthday + "', '" + email + "', '" + username + "', '" + password +"');", function(ID){
                return callback('{"Status":"Success", "ID": '+ ID +'}');
        });
}
