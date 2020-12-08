const http = require('http'); 
const url = require('url');
const index = require('./index.js');
const SqlConnection = require("./Modules/SqlConnection.js");
const Log = require("./Modules/Log.js");
var tokenApp = "";
var isActive = false;

const requestListener = function (req, res) {
    if(req.method == 'post'){
        index.data.onPostRequest(); 
    }
    else {
        res.setHeader('Content-type', 'application/json'); 
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.writeHead(200);  // HTTP status code
        let query = url.parse(req.url, true).query; 
        let path = req.url.split('?')[0];
        if(query.TokenApp !== tokenApp){
            Log.log("Request received but wrong token.")
            res.end('{"ServerResponse": "200","Data": "Token missing"}'); 
            return; 
        }
        if(req.method == "GET"){
            index.data.onGetRequest(path, query, req, res); 
            return; 
        }
        else if( req.method == "POST"){
            index.data.onPostRequest(path, query, req, res); 
            return; 
        }
        else{
            res.end('{"ServerResponse": "200","Data": "Unknown type of request"}');
            return; 
        }
    }
}

const server = http.createServer(requestListener);
server.listen(8080, function() {
Log.log("Listening on port 8080");
SqlConnection.sqlCon.getConnection(function(err, connection) 
{
    if(err) throw err; 
        connection.query("SELECT * FROM `TokensApp` WHERE IsActive = 1", function (err, result, fields) {
            connection.release(); 
            if (err) throw err;
            tokenApp = result[0].TokenApp;
            Log.log(tokenApp); 
        });
    })
}); 

