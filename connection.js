const mysql = require("mysql");
let config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "samochody"
};
const connection =  mysql.createConnection(config);
module.exports = connection;