'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan');
const morganBody = require('morgan-body');
const routes = require('./lib/routes')
const secure = require('ssl-express-www');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}));

app.use(helmet())
app.disable('x-powered-by')

app.use(compression({level: 9}))

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
  morganBody(app);
}

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

var sessionOptions = {
  secret: "2343bnh89efh23hd2dh32hd98hi",
  rolling: true,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: expiryDate
  }
}

app.use(cookieParser(sessionOptions.secret)); // read cookies (needed for auth)

app.use(session(sessionOptions));

app.use(routes)

// remeber the webpack proxy section to bind these to the client-side

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(secure);
  var DIST_DIR = path.join(__dirname, "/client/build")
  app.use(express.static(DIST_DIR));

  app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
  });
} else {
  // return server.html if cannot find file (this must be at the end)
  app.get('*', (req, res) => {
    res.send("<html><head></head><body>undefined</body></html>")
  });
}

app.listen(port);
console.log(`Server listening on ${port}`);
