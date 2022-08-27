const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
global.__basepath = __dirname

app.use(
    cors({
        origin: ["http://localhost:8000", "http://localhost:8080"],
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
        credentials: true
    })
)

app.unsubscribe(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',require('./src/routers'));

app.listen(port, () => console.log(`App listening on port ${port}`));