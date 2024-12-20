const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'svc_backend',
    password: 'Censored_hardcoded_credentials',
    database: 'dns_firewall'
});

module.exports = pool.promise();