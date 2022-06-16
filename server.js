const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');

const app = express();

// app.use(helmet()); // Add Helmet as a middleware

// Serve static files
app.use(express.static(__dirname + '/dist/ucvr-web'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ucvr-web/index.html'));
});

https.createServer({
  key: fs.readFileSync('/certi/llave_continental2022.key'),
  cert: fs.readFileSync('/certi/continental.crt')
}, app)
.listen(process.env.PORT || 443, '0.0.0.0', function () {
  console.log('VRUC app listening on port 443.')
});

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
