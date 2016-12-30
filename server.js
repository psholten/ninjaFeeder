var express = require("express");
var bodyParser = require("body-parser");
var CronJob = require("cron").CronJob;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var job = new CronJob('* * * * * *', function () {
    console.log('On Tick');
});

app.get('/', function (req, res) {
    res.sendfile("index.html");
});

app.post('/feedNinja', function (req, res) {
    console.log("Kitty Feed");
    res.end("Ninja was feed at: " + new Date().toLocaleString());
});

app.post('/auto', function (req, res) {
    var val = req.body.val;
    if (val === 'ON') {
        job.start();
        res.end("Auto Feeder Started - " + new Date().toLocaleString());
        console.log(' ------job started ------');
    }
    else {
        job.stop();
        res.end("Auto Feeder Stopped - " + new Date().toLocaleString());
        console.log(' ------job Stopped ------');
    }
})

app.listen(3030, function () {
    console.log("Started on PORT 3030");
})