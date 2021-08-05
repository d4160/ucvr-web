const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();

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
.listen(443, function () {
  console.log('VRUC app listening on port 443.')
});
