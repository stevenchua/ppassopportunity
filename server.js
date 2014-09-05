/**
* Establish mysql connection
*/ 
var mysql = require('mysql');
var sTable = 'opportunity';
var sIndexColumn = '*';
var connection = mysql.createConnection({
  host     : '162.243.20.178',
  port     : '3306',
  user     : 'rkjha',
  password : 'root', 
  database : 'db_opportunity',
});

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('mysql lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    console.log('mysql reconnects');

    handleDisconnect(connection);
    connection.connect();
  });
}

handleDisconnect(connection);
 var cache_data = {};
 var aColumns = [];

/**
* Get the names for the table columns
* The names are used for the sql-statement
*/
getColumnNamesForTable();
function getColumnNamesForTable()
{
  connection.query('SHOW COLUMNS FROM ' + sTable,
    function selectCb(err, results, fields){
      if(err){
        console.log(err);
      }
      for(var i in results)
      {
        aColumns.push(results[i]['Field']);
      }
    });
}
