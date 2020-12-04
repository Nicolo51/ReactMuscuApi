const ORM = require("../Modules/ORM.js"); 

exports.GetSessions = function(token, callback){
    ORM.OrmParser.CheckTokenUser(token, function(IdUser){
        if(IdUser > 0){
            ORM.OrmParser.ExecuteSelectQuery("SELECT ID, Name FROM Sessions Where ID_User = " + IdUser +" AND IsDeleted=0;", function(results){
                return callback('{"Status":"Success", "Sessions":' + JSON.stringify(results) + '}'); 
            }); 
        }
        else {
            return callback('{"Status":"Fail", "Message": "Wrong or not active token" }');
        }
    })
}
