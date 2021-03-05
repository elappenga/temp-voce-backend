const express = require('express');
const app = express();
const twitter = require('./routes/twitter');

const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.get("/", (req, res) => {
    res.send({data:'data'});
})
app.use('/twitter', twitter);

app.listen(port, () => console.log(`listening on port ${port}`));