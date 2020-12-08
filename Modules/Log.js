exports.log = function(msg){
    console.log("[" + new Date().getFullYear().toString() + "-" + new Date().getMonth().toString() + "-" + new Date().getDay().toString() + " " + new Date().getHours().toString() + ":" + new Date().getMinutes().toString() + ":" + new Date().getSeconds().toString()+ "] " + msg); 
}