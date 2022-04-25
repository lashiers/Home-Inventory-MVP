var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'base.potentialgamestudio.com',
  port            : '3306',
  user            : 'sean',
  password        : 'seanRocks!123',
  database        : 'mvp_ui'
});
module.exports.pool = pool;
