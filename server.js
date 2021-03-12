const express = require('express');
const app = express();
const twitter = require('./routes/twitter');
const cors = require('cors');
const pool = require('./routes/db');

const port = process.env.PORT || 8080;

app.use(cors());

// app.use(express.static(__dirname + "/public"));

// app.use(express.urlencoded({extended: false}))


app.use(express.json())

//Twitter endpoints//

app.get("/", (req, res) => {
    res.send({data:'data'});
})
app.use('/twitter', twitter);

//DB endpoints//

app.get('/', (req, res) => {
    res.send({data: 'hello'});
})

//Get tags for handle//
app.get('/handles/:handle', async (req, res) => {
    const { handle } = req.params;
    try {
        const account = await pool.query(
            `select h.handle AS handle, 
            array_agg(tags.tag_name) AS tags
            from handles h 
            inner join tagmap on tagmap.handle_id = h.id 
            inner join tags on tagmap.tag_id = tags.id 
            where h.handle=$1
            group by h.handle`, [handle]);

            res.json(account.rows);
    } catch (error) {
        console.error(err.message);
    }
    });

    //Get all handles with Tag value//
    app.get('/tags/:tag', async (req, res) => {
    const { tag } = req.params;
    try {
        const tag_name = await pool.query(
            `select tags.tag_name AS tag_name, 
            array_agg(h.handle) AS handles 
            from handles h 
            inner join tagmap on tagmap.handle_id = h.id
            inner join tags on tagmap.tag_id = tags.id
            where tags.tag_name=$1
            group by tags.tag_name`, [tag]);
        res.json(tag_name.rows);
    } catch (error) {
        console.error(err.message);
    }
    });

//Add new handle to db//

app.post("/handles", async (req, res) => {
    try {
        const { handle } = req.body;
        const newHandle = await pool.query(
            "INSERT INTO handles (handle) VALUES ($1) RETURNING *",
            [handle]
        );

        res.json(newHandle);
    } catch (err) {
        console.error(err.message);
    }
})



app.listen(port, () => console.log(`listening on port ${port}`));