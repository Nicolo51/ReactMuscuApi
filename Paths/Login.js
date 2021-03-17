const Log = require("../Modules/Log.js");
const ORM = require("../Modules/ORM.js");

exports.Login = function(username, password, callback) {
    if(username === undefined || password === undefined ){
        return callback('{"Usertoken": "null", "Status":"Fail", Message:"Credential dosn\'t match"}');
    }
    ORM.OrmParser.ExecuteSelectQuery("SELECT * FROM `Users` Where username ='" + username + "' OR email = '" + username + "';", function (result) {
        Log.log("result =" +  result); 
        if(result.length > 1){
            Log.log("Username query return more than one result.");
            return callback('{"Usertoken": "null", "Status":"Fail", Message:"More than one reuslt with this username/email."}');
        }
        if(result.length < 1){
		return callback('{"Usertoken": "null", "Status": "Fail", Message: "Credential dosn\'t match"}');
	}
        const userData = result[0]; 
        if(userData.password != password)
            return callback('{"Usertoken": "null", "Status":"Fail", Message:"Credential dosn\'t match"}'); 
        
        const userToken = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
        ORM.OrmParser.ExecuteNonQuery("UPDATE `TokenUser` SET `IsActive`= 0 WHERE ID_User=" + userData.ID, function(isDone){
            ORM.OrmParser.ExecuteNonQuery("INSERT INTO `TokenUser`(`ID_User`, `Token`, `date`, `IsActive`) VALUES (" + userData.ID + ", '" + userToken + "', NOW(), 1); ", function(isDone){
                UserResponse = '{"Usertoken": "' + userToken + '", "Status":"Success"}';
                return callback(UserResponse);
            }); 
        }); 
    }); 
}
