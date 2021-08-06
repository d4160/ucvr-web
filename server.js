const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');

const app = express();

app.use(helmet()); // Add Helmet as a middleware

// Serve static files
app.use(express.static(__dirname + '/dist/ucvr-web'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ucvr-web/index.html'));
});

https.createServer({
  key: fs.readFileSync('/etc/ssl/conti/llave_continental2021.key'),
  cert: fs.readFileSync('/etc/ssl/conti/continental.crt')
}, app)
.listen(6000, '172.16.3.252', function () {
  console.log('VRUC app listening on port 6000.')
});
