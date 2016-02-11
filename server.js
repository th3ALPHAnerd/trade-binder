var express = require('express');
var app = express();
app.use(express.static('public'));

//Should be very simple to make some service calls this way
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

var server = app.listen(18080, function () {

    //For some reason address is coming up blank.
    var host = server.address().address;
    var port = server.address().port;

    console.log("TradeBinder app listening at http://%s:%s", host, port);
});