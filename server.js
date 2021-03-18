const express = require('express');
const app = express();
const twitter = require('./routes/twitter');
const cors = require('cors');
const pool = require('./routes/db');

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use('/twitter', twitter);
app.use('/db', pool);

app.listen(port, () => console.log(`listening on port ${port}`));

// app.use(express.static(__dirname + "/public"));

// app.use(express.urlencoded({extended: false}))


//Twitter endpoints//

app.get("/", (req, res) => {
    res.send({data:'data'});
})



