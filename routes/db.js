const { Pool } = require('pg');
try {
  // When not running via Heroku, this will load the .env file.
  require('dotenv').config();
} catch (e) {
  // When running with Heroku, dotenv doesn't need to be available.
}
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});

module.exports = pool;


// const Pool = require('pg').Pool;

// const pool = new Pool({
//     // user: "evxnzlseaixlbs",
//     // password: "33743f41727f7961daa8b87147916afa4122cab55ac68262c250246ba8fefc5f",
//     // database: "d1b2anusq9k3td",
//     // host: "ec2-34-195-233-155.compute-1.amazonaws.com",
//     // user: 'postgres',
//     // password: 'password',
//     // database: 'VoceFemme',
//     // host: 'localhost',
//     port: "5432",
//     ssl: false
// });

// module.exports = pool;