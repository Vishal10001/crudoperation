const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const cors = require("cors")

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors())



require("./app")(app);
require("./config/mongoose");


app.listen(port, () => {
    console.log(`Listening on port ${3001}`);
});
