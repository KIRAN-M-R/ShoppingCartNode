const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "B$ck2Si6e@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

/*const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'B$ck2Si6e@'
});

module.exports = pool.promise();*/
