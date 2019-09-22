var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
})

connection.connect(function(err) {
    if (err) throw err;
    else {
      console.log("Connected!");
    }
    
})



connection.end()