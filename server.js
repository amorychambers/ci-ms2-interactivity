// This file represents the express.js server required to run the application in Node.js, as the Steam Web API only accepts server-side calls.

const api = 'EC249E704C9C50C5ACBDF149A4A180E5';

const express = require('express');
const app = express();
const request = require('request');
const path = require('path');

// Code snippet to set up application to work on a deployed Heroku app taken from Heroku Docs, linked in readme
app.use(express.static(path.join(__dirname)));
app.set('port', process.env.PORT || 5500);
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index.html'));
app.get('/', (req, res) => res.status(404).res.render('404.html'));

// Code for creating a server to make server side CORS passing calls taken from Dan Beyer's How-To-Guide for the Steam Web API on Github, linked in readme. Code snippet represents rest of file, tailored for this application
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/getlibrary', function(req, res){
    const qParams = [];
    for (let p in req.query) {
        qParams.push({'name': p, 'value': req.query[p]})
    }
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api}&steamid=${qParams[0].name}&include_appinfo=true&format=json`;
    request(url, function(err, response, body){
        if (!err && response.statusCode < 400) {
            console.log(body);
            res.send(body);
        }
    });
});

app.get('/getnews', function(req, res) {
	const qParams = [];
	for (let p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
	const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${qParams[0].name}&count=3&maxlength=300&format=json`;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('404.html');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});



