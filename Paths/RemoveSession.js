const Log = require("../Modules/Log.js");
const ORM = require("../Modules/ORM.js");

exports.RemoveSession = function(body, callback){
    const ID_Session = body.ID_Session;
    const token = body.token; 

    Log.log(ID_Session + " : " + token);
    if(ID_Session === undefined || token == undefined ){
        return callback('{"Status":"Check arguments"}');
    }
    ORM.OrmParser.CheckTokenUser(token, function(IdUser){
        Log.log(IdUser);
        if(IdUser > -1){
            ORM.OrmParser.CheckSessionOwner(IdUser, ID_Session, function(isOwned){
                if(isOwned){
                    ORM.OrmParser.ExecuteNonQuery("UPDATE `Sessions` SET IsDeleted = 1 WHERE ID = " + ID_Session + "; UPDATE `Exercices` SET IsDeleted = 1 WHERE ID_Session = " + ID_Session + ";", function(IsDone){
                        Log.log(IsDone);
                        if(IsDone){
                            return callback('{"Status":"Success", "Message" : "Session deleted successfully" }');
                        }
                        else{
                            return callback('{"Status":"Fail", "Message":"Failed to update database"}'); 
                        }
                    }); 
                }
                else{
                    return callback('{"Status":"Fail", "Message":"The session is not owned by the user or doesn\'t exist"}'); 
                }
            }); 
        }
        else {
            return callback('{"Status":"Fail", "Message": "Wrong or not active token" }');
        }
    })
}