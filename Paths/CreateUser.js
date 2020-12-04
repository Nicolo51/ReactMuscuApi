const ORM = require("../Modules/ORM.js");

exports.CreateUser =function(body, callback){
    const firstname = body.firstname;
    const lastname = body.lastname;
    const birthday = body.birthday;
    const email = body.email;
    const username = body.username;
    const password = body.password;

        if(firstname === undefined || lastname === undefined || birthday === un$
                return callback('{"Status":"Check arguments"}');
        }

        ORM.OrmParser.ExecuteInsertQuery("INSERT INTO `Users`(`firstname`, `las$
                return callback('{"Status":"Success", "ID": '+ ID +'}');
        });
}
const ORM = require("../Modules/ORM.js");
