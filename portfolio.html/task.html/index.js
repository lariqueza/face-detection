module.exports = require('./lib/axios');

var express = require('express');
var Datastore = require('nedb');
var fetch = require('node-fetch');
require('dotenv').config();

var app = express();
var port = process.env.PORT 
app.listen(port, () => {
    console.log(`starting server at ${port}`)
});
app.use(express.static('public'));
app.use(express.json({ limit: 'imb' }));

var database = new Datastore('database.db');
database.loadDatabase();

app.get('https://70c5b72c-65db-4a66-ba01-3e14763157e8.mock.pstmn.io/posts', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
    })
})