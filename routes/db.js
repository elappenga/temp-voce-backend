const express = require('express');
// const { Pool } = require('pg');
const db = express.Router();

try {
  // When not running via Heroku, this will load the .env file.
  require('dotenv').config();
} catch (e) {
  // When running with Heroku, dotenv doesn't need to be available.
}
// const connectionString = process.env.DATABASE_URL;
// const pool = new Pool({
//   connectionString: connectionString,
//   ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
// });

const pool = require('../connection');

function getTags(req, res) {
  const tag_list = pool.query(
    `select tgroups.group_name AS group_name,
    tags.id AS tag_id,
    tags.tag_name AS tag
    from tags
    inner join tgroups on tgroups.id = tags.tag_group_id
    order by tgroups.group_name`);
  res.json(tag_list.rows);
  res.send(tag_list.rows);
}

db.get('/', (req, res) => {
  console.log("hello");
  getTags(req, res);
});

//DB endpoints//

db.get('/', (req, res) => {
  res.send({data: 'hello'});
})

//Get all handles
db.get('/handles', async (req, res) => {
  try {
      const account = await pool.query(
          `select * from handles
          order by handles.handle`);

          res.json(account.rows);
  } catch (error) {
      console.error(err.message);
  }
  });

//Get tags for handle//
db.get('/handles/:handle', async (req, res) => {
  const { handle } = req.params;
  try {
      const account = await pool.query(
          `select h.handle AS handle,
          tagmap.tag_id AS tag_id,
          tags.tag_name AS tag_name
          from handles h 
          inner join tagmap on tagmap.handle_id = h.id 
          inner join tags on tagmap.tag_id = tags.id 
          where h.handle iLIKE $1
          order by h.handle`, [handle]);

          res.json(account.rows);
  } catch (error) {
      console.error(err.message);
  }
  });

  //Get all handles with Tag value//
  db.get('/tags/:tag', async (req, res) => {
  const { tag } = req.params;
  try {
      const tag_name = await pool.query(
          `select tags.tag_name AS tag_name, 
          h.handle AS handle 
          from handles h 
          inner join tagmap on tagmap.handle_id = h.id
          inner join tags on tagmap.tag_id = tags.id
          where tags.tag_name=$1
          order by tags.tag_name`, [tag]);
      res.json(tag_name.rows);
  } catch (error) {
      console.error(err.message);
  }
  });

  //Get current list of tag groups and their tags//
  db.get('/tag-groups', async (req, res) => {
  try {
      const tag_list = await pool.query(
          `select tgroups.group_name AS group_name,
          tags.id AS tag_id,
          tags.tag_name AS tag
          from tags
          inner join tgroups on tgroups.id = tags.tag_group_id
          order by tgroups.group_name`);
      res.json(tag_list.rows);
      res.send(tag_list.rows);
  } catch (error) {
      console.error(err.message);        
  }
  });

//Add new handle to db//

db.post("/add-handle", async (req, res) => {
  try {
      const { handle } = req.body;
      const newHandle = await pool.query(
          "INSERT INTO handles (handle) VALUES ($1) RETURNING *",
          [handle]
      );

      res.json(newHandle.rows);
  } catch (err) {
      console.error(err.message);
  }
});

db.post("/add-tagmap", async (req, res) => {
  try {
      const { handle_id } = req.body;
      const { tag_id } = req.body;
      const newMapping = await pool.query(
          "INSERT INTO tagmap (handle_id, tag_id) VALUES ($1, $2) RETURNING *",
          [handle_id, tag_id]
      );

      res.json(newMapping.rows);
  } catch (err) {
      console.error(err.message);
  }
});

module.exports = db;

// module.exports = pool;



const express = require('express');
// const { Pool } = require('pg');
const db = express.Router();

db.get('/tag-groups', async (req, res) => {
  try {
      const tag_list = await pool.query(
          `select tgroups.group_name AS group_name,
          array_agg(tags.id) AS tag_ids,
          array_agg(tags.tag_name) AS tags
          from tags
          inner join tgroups on tgroups.id = tags.tag_group_id
          group by tgroups.group_name`);
      res.json(tag_list.rows);
  } catch (error) {
      console.error(err.message);        
  }
  });


module.exports = db;

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