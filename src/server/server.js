var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session= require('express-session');
var connect = require('connect');
var testApp =connect();
var cs = require('cansecurity'), cansec,SESSIONKEY = "ABCDEFG",
// static database for testing

user = {name:"john",pass:"1234",age:25};

//app.engine('html', require('ejs').renderFile);
var path = require('path');
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
    
    //res.send(cansec.getUser(req));
    res.render('index.html');
    
});
cansec = cs.init({
    validate: function(login,password,callback){
        if (user.name !== login) {
            // no such user - ERROR
            callback(false,null,"invaliduser");
        } else if (password === undefined) {
            // never asked to check a password, just send the user - GOOD
        callback(true,user,user.name,shaHash(pass));
        } else if (user.pass !== pass) {
            // asked to check password, but it didn't match - ERROR
            callback(false,null,"invalidpass");
        } else {
            // user matches, password matches - GOOD
            callback(true,user,user.name,shaHash(pass));
        }
    },
    sessionKey: SESSIONKEY
});


//app.configure(function(){
    app.use(cookieParser());    
    app.use(session({secret: "agf67dchkQ!"}));
    app.use(cansec.validate);
    app.use(function(req,res,next){
        // send a 200
        console.log("hello");
        sendResponse(req,res);
    });
    function sendResponse(req,res){
        console.log("sendResponse");
        console.log(cansec.getUser(req));
    }
//});
//     app.use(function(err,req,res,next){
//         console.log("hello");
//     var data;
//     if (err && err.status) {
//         // one of ours
//         data = err.message ? {message: err.message} : null;
//         sendResponse(req,res,err.status,data);
//     } else if (err && err.type && err.type === "unexpected_token") {
//         // malformed data
//         sendResponse(req,res,{message:err.type},400);
//     } else {
//         sendResponse(req,res,500);
//     }
// //console.log(cansec.getUser(req));
// });
//app.get("/api/user/search",cansec.getUser(req));
var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('SamplpeApp2 app listening at http://%s:%s', host, port);
    
});
