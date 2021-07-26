function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
require('dotenv').config()

const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/top100-bingo'));

app.get('/*', ({ res }) => {
  res.sendFile('index.html', { root: 'dist/<name-on-package.json>/' } )
});

app.listen(process.env.PORT || 80);