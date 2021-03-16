const Log = require("./Log.js");
const SqlConnection = require("./SqlConnection.js");

exports.OrmParser = {
    ExecuteSelectQuery: function (sql, callback){
      SqlConnection.sqlCon.getConnection(function(err, connection){
        connection.query(sql, function(err, results){
          connection.release();
              if (err){ 
                throw err;
              }
              return callback(results);
      })
  })}, 

  ExecuteInsertQuery: function(sql, callback){
    var finalQuery = sql.trim();
    var words = finalQuery.split(' ');
    if(words[0].toLowerCase() == "insert"){
      this.ExecuteSelectQuery(finalQuery, function(results){
        return(callback(results.insertId));
      })
    } 
    else {
      throw("No insert query detected."); 
    }
  }, 

  ExecuteNonQuery: function(sql){
    SqlConnection.sqlCon.getConnection(function(err, connection){
      connection.query(sql, function(err, results){
        connection.release();
      if(err) throw err; 
        Log.log(sql + "have been well executed !"); 
    })
  })},

  CheckTokenUser: function(token, callback){
    this.ExecuteSelectQuery("SELECT ID_User, IsActive FROM TokenUser WHERE Token ='" + token +"';", function(results) {
      Log.log(results);
      if(results.length > 0){
        var result = results[0]; 
        if(result.IsActive == 1){
          Log.log(result.ID_User);
          Log.log(result);
          return callback(result.ID_User); 
        }
        return callback(-1); 
      }
      return callback(-1);      
    });
  }, 
  CheckSessionOwner: function(idUser, idSession, callback){
    this.ExecuteSelectQuery("SELECT * FROM Sessions WHERE ID = " + idSession + " AND IsDeleted=0;", function(results){
      if(results.length > 0){
        const result = results[0]; 
        if(result.ID_User == idUser){
          return callback(true);
        }
        else{
          return callback(false); 
        }
      }
      else{
        return callback(false); 
      }
    });
  },
  CheckExerciceOwner: function(IdUser, ID_Exercice, callback){
    this.ExecuteSelectQuery("SELECT * FROM Exercices WHERE ID = " + ID_Exercice + " AND IsDeleted=0;", function(result){
      this.CheckSessionOwner(IdUser, result.ID_Session, function(isOwned){
        callback(isOwned);
      })
    });
  }
} 