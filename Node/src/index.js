require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require(__dirname + '/db_connect');
const cors = require('cors');


app.use(cors());
//set top middleware
//which to use is decided by header content-type
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/podcaster_dashboard',require(__dirname + '/routes/podcaster_dashboard'));

app.use('/explore',require(__dirname + '/routes/explore'));

app.get('/', function (req, res) {
    // res.send('Hello World!');
    res.send('已開啟express')
});


app.get('/try-db', (req, res) => {
    db.query('SELECT * FROM products LIMIT 5')
        .then(([results]) => {
            res.json(results);
        })
});







app.use(express.static(__dirname + '/../public/'));

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404-找不到網頁');
});

app.listen(5566, function () {
    console.log('啟動 server 偵聽埠號 5566');
});

