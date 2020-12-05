const login = require('./Paths/Login.js'); 
const getSessions = require("./Paths/GetSessions.js");
const getExercices = require("./Paths/GetExercices.js");

const createSession = require ('./Paths/CreateSession.js');
const createExercice = require ("./Paths/CreateExercice.js");  
const createUser = require ("./Paths/CreateUser.js"); 
var methods = {
    onGetRequest : function(path, args, req, res){ 
        console.log("A Get request have been received !"); 
        console.log(path); 
        console.log(args); 
        switch(path.toLowerCase()){
            case "/favicon.ico":
                res.end();
                break; 
            case "/login" :
                login.Login(args.username, args.password, function(result){
                    if(result == {}){
                        res.end('{"ServerResponse": 200,"Data": "No password or username given "}');
                    }else{
                    res.end('{"ServerResponse": 200,"Data": ' + result + '}');
                }}); 
                break;
            case "/getsessions" : 
                getSessions.GetSessions(args.token, function(results){
                    res.end('{"ServerResponse": 200,"Data": ' + results + '}'); 
                })
                break; 
            case "/getexercices" : 
                getExercices.GetExercices(args.token, args.idSession, function(results){
                    res.end('{"ServerResponse": 200,"Data": ' + results + '}'); 
                })
                break; 
            default :
                console.log("Unknown Path")
                res.end('{"ServerResponse": 404,"Data": "Unknow Path Get"}');
                break; 
        };
        
    },
    onPostRequest : function(path, args, req, res){
        console.log("A Post request have been received !");
        console.log(path); 
        console.log(args);

        var body = '';

        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            var JsonBody = {}; 
            try{
                JsonBody = JSON.parse(body);
            }
            catch(e){
                console.log(e);
                res.end('{"ServerResponse": 200,"Data": {"Status": "Fail","Message": "' + e.toString() + '"}}');
                return; 
            }
            switch(path.toLowerCase()){
                case "/favicon.ico":
                    res.end();
                    break; 
		case "/createuser" : 
		    createUser.CreateUser(JsonBody, function(result){
			res.end('{"ServerResponse" : 200,"Data": ' + result + '}');
		    }); 
		    break; 
                case "/createsession" : 
                    createSession.CreateSession(JsonBody, function(result){
                        res.end('{"ServerResponse": 200,"Data": ' + result + '}');
                    }); 
                    break;
                case "/createexercice" : 
                    createExercice.CreateExercice(JsonBody, function(result){
                        res.end('{"ServerResponse": 200,"Data": ' + result + '}');
                    }); 
                    break; 
                default :
                    console.log("Unknown Path")
                    res.end('{"ServerResponse": 404,"Data": "Unknow Path Get"}');
            };
        });
    },
}; 

exports.data = methods; 
