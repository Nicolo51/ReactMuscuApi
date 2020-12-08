const Log = require("../Modules/Log.js");
const ORM = require("../Modules/ORM.js");

exports.CreateSession = function(body, callback){
    const token = body.token; 
    const name = body.name;
    if(name === undefined || token == undefined ){
        return callback('{"Status":"Check arguments"}');
    }
    ORM.OrmParser.CheckTokenUser(token, function(IdUser){
        if(IdUser > -1){
            ORM.OrmParser.ExecuteInsertQuery("INSERT INTO `Sessions`(`ID_User`, `Name`) VALUES (" + IdUser + ",'" + name + "');", function(ID){
                return callback('{"Status":"Success", "ID": '+ ID +'}');
            }); 
        }
        else{
            return callback('{"Status":"Fail", "Message": "Wrong or not active token" }');
        }
    })
}