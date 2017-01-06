var express = require("express");
var bodyParser = require("body-parser");
var CronJob = require("cron").CronJob;
var Gpio = require("onoff").Gpio,
    relay = new Gpio(4, 'out');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function feedKitty() {
    console.log('Feeding Kitty..');
    relay.writeSync(1);
    setTimeout(function () {
        relay.writeSync(0);
    }, 5000);
}
var autoMode = false;
var job = new CronJob('00 00 7,19 * * *', function () {
    feedKitty();
    console.log("Ninja was feed at: " + new Date().toLocaleString());
});

//TODO use couch DB to have persisted sstatus?

//TODO extract out server code?
app.get('/', function (req, res) {
    res.sendfile("index.html");
});

app.get('/status', function (req, res) {
    res.send({ status: autoMode });
});

app.post('/feedNinja', function (req, res) {
    feedKitty();
    console.log("Kitty Feed");
    res.end("Ninja was feed at: " + new Date().toLocaleString());
});

app.post('/auto', function (req, res) {
    var val = req.body.val;
    if (val === 'ON') {
        autoMode = true;
        job.start();
        res.end("Auto Feeder Started - " + new Date().toLocaleString());
        console.log(' ------job started ------');
    }
    else {
        autoMode = false;
        job.stop();
        res.end("Auto Feeder Stopped - " + new Date().toLocaleString());
        console.log(' ------job Stopped ------');
    }
})

app.listen(3000, function () {
    console.log("Started on PORT 3000 at: " + new Date().toLocaleString());
})

function exit() {
    relay.unexport();
    process.exit();
}
process.on('SIGINT', exit);
