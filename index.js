// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date
  const inputRegexDate = /\d{4}-\d{2}-\d{2}/
  const inputRegexTs = /\d{13}/
  let newDate = ''
  let timestamp = ''
  let right = false
  if (!dateInput) {
    right = true
    newDate = new Date()
    timestamp = newDate.getTime()
    res.json({unix: Number(timestamp), utc: newDate.toUTCString()})
  }  
  
  if (inputRegexDate.test(dateInput)) {
    right = true
    newDate = new Date(dateInput)
    timestamp = newDate.getTime()
    res.json({ unix: Number(timestamp), utc: newDate.toUTCString() })
  }

  if (inputRegexTs.test(dateInput)) {
    right = true
    timestamp = dateInput
    newDate = new Date(Number(timestamp))
    res.json({ unix: Number(timestamp), utc: newDate.toUTCString() })
  }

  if (right === false) {
    res.json({ error : "Invalid Date" })
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3002, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
