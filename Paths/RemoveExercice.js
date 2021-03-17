const Log = require("../Modules/Log.js");
const ORM = require("../Modules/ORM.js");

exports.RemoveExercice = function(body, callback){
    const ID_Exercice = body.ID_Exercice;
    const token = body.token; 

    Log.log(ID_Exercice + " : " + token);
    if(ID_Exercice === undefined || token == undefined ){
        return callback('{"Status":"Check arguments"}');
    }
    ORM.OrmParser.CheckTokenUser(token, function(IdUser){
        Log.log(IdUser);
        if(IdUser > -1){
            ORM.OrmParser.CheckExerciceOwner(IdUser, ID_Exercice, function(isOwned){
                if(isOwned){
                    ORM.OrmParser.ExecuteNonQuery("UPDATE `Exercices` SET IsDeleted = 1 WHERE ID = " + ID_Exercice + ";", function(){
                        return callback('{"Status":"Success", "Message" : "Exercice deleted successfully"}');
                    }); 
                }
                else{
                    return callback('{"Status":"Fail", "Message":"The exercice is not owned by the user or doesn\'t exist"}'); 
                }
            }); 
        }
        else {
            return callback('{"Status":"Fail", "Message": "Wrong or not active token" }');
        }
    })
}