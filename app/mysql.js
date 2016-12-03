var mysql = require('mysql');
//创建mysql连接
var client = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'api52',
});

client.connect();

// client.query("use " + TEST_DATABASE);

client.query(
    'select * from mobile limit 5',
    function (err,results, fields) {
        if (err) {
            throw err;
        }
        if (results) {
          // var length = results.length;
          //   for (var i = 0; i < length; i++) {
          //       // console.log("%d\t%s\t%s\t%s\t%s", results[i].id, results[i].mobile, results[i].province, results[i].city, results[i].sp);
          //   }
          //   console.log(results);
           for (var key in results) {
             var value = results[key];
             console.log(value);
           }
        }
    }
);
client.end();
