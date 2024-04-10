// Code for creating a server to make server side HTTP calls taken from Dan Beyer's How-To-Guide for the Steam Web API on Github, linked in readme. Code snippet represents entire file
// This file represents the express.js server required to run the application locally, as the Steam Web API only accepts server-side calls. In the deployed version of the app, it instead accepts calls from the github Pages url

const api = ''

var express = require('express');
var app = express();
var request = require('request');

app.set('port', 5500);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/getlibrary', function(req, res){
    var qParams = [];
    for (var p in req.query) {
        qParams.push({'name': p, 'value': req.query[p]})
    }
    var url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api}&steamid=${qParams[0].name}&include_appinfo=true&format=json`;
    request(url, function(err, response, body){
        if (!err && response.statusCode < 400) {
            console.log(body);
            res.send(body);
        }
    });
});

app.get('/getnews', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
	var url = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=' + qParams[0].name + '&count=3&maxlength=300&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });



