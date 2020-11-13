const ORM = require("../Modules/ORM.js"); 

exports.GetExercices = function(token, ID_Session, callback){
    ORM.OrmParser.CheckTokenUser(token, function(IdUser){
        if(IdUser > 0){
            ORM.OrmParser.CheckSessionOwner(IdUser, ID_Session,  function(isOwned){
                if(isOwned){
                    ORM.OrmParser.ExecuteSelectQuery("SELECT `ID`, `ID_Session`, `Name`, `muscle`, `Rest`, `Nbr_Rep`, `Weight` FROM Exercices Where ID_Session = "+ ID_Session +" AND IsDeleted=0;", function(results){
                
                        return callback('{"Status":"Success", "Exercices":' + JSON.stringify(results)); 
                    }); 
                }
                else{
                    return callback('{"Status":"Fail", "Message":"The session is not owned by the user or doesn\'t exist"}'); 
                }
            }); 
        }
        else {
            return callback('{"Status":"Fail", "Message": "Wrong or not active token"}');
        }
    })
}