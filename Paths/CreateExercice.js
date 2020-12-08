const Log = require("../Modules/Log.js");
const ORM = require("../Modules/ORM.js");

exports.CreateExercice = function(body, callback){
    const ID_Session = body.ID_Session;
    const token = body.token; 
    const name = body.name;
    const muscle = body.muscle;
    const rest = body.rest;
    const nbrRep = body.nbrRep;
    const weight = body.weight;
    Log.log(name + " " + token);
    if(name === undefined || token == undefined ){
        return callback('{"Status":"Check arguments"}');
    }
    ORM.OrmParser.CheckTokenUser(token, function(IdUser){
        Log.log(IdUser);
        if(IdUser > -1){
            ORM.OrmParser.CheckSessionOwner(IdUser, ID_Session, function(isOwned){
                if(isOwned){
                    ORM.OrmParser.ExecuteInsertQuery("INSERT INTO `Exercices`(`ID_Session`, `Name`, `muscle`, `Rest`, `Nbr_Rep`, `Weight`) VALUES (" + ID_Session + ",'" + name + "','" + muscle + "'," + rest + "," + nbrRep + "," + weight + ");", function(ID){
                        return callback('{"Status":"Success", "ID":' + ID + '}');
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