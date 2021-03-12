const Pool = require('pg').Pool;

const pool = new Pool({
    // user: "ajtjprzndinjuf",
    // password: "cbd5d9df7efa0e003cbe6ddeca7478478ae54aab44e9cec87ddfe828c1e8b5c1",
    // database: "d11aj4aulindol",
    // host: "ec2-35-171-57-132.compute-1.amazonaws.com",
    user: 'postgres',
    password: 'password',
    database: 'VoceFemme',
    host: 'localhost',
    port: "5432",
    ssl: false
});

module.exports = pool;