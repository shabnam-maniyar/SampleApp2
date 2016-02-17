var express = require('express');
var app = express();
//app.engine('html', require('ejs').renderFile);
var path = require('path');
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
    res.render('index.html');
});
var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('SamplpeApp2 app listening at http://%s:%s', host, port);
});
