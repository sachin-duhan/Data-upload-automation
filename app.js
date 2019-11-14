const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs')
const csv = require("csv-parser");

const mongoconn = require('./util/database');
const getDb = require("./util/database").getDb;

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "csv");
    },
    filename: (req, file, cb) => {
        cb(null, "ravinder.csv")
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('csv'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res, next) => {
    res.render("uploaddetails")
})

app.post('/submitcsv', (req, res, next) => {
    const p = path.join(
        path.dirname(process.mainModule.filename),
        'csv',
        'ravinder.csv'
    );

    let details = [];

    fs.createReadStream(p)
        .pipe(csv())
        .on('data', (row) => {
            details.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            const db = getDb();
            db.collection("cardetails")
                .insertMany(details)
                .then(result => {
                    console.log(result)
                })
                .catch(err => {
                    console.log(err)
                });
            fs.unlink(p, err => console.log(err));

            res.redirect('/');
        });


})



mongoconn.mongoConnect(() => {
    app.listen(4000, console.log("started"));
})


app.listen(4000, console.log("started"));