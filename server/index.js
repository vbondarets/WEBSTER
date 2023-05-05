require('dotenv').config()
const express = require('express');
const seqelize = require('./models/db');
const models = require("./models/models");
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandler');

const PORT = process.env.PORT ? process.env.PORT : 5000;
const HOST = process.env.HOST ? process.env.HOST : 'localhost';

const app = express();

app.use(cors({ origin: { origin: '*' }, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("asd");
});
app.use("/api", router);

//errors, last middleware
app.use(errorHandler);

app.get('/api', (req, res) => {
    return res.send("aboba");
});
app.post('/api', (req, res) => {
    console.log(req)
    return res.send("aboba");
});

const start = async () => {
    try {

        await seqelize.authenticate();
        await seqelize.sync();
        app.listen(PORT, () => console.log(`Server start on http://${HOST}:${PORT}`));
    }
    catch (err) {
        console.log("Error: " + err);
    }
}
start();


module.exports = app;