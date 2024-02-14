const express = require('express');
const session = require('express-session');
const passport = require('passport');
const http = require('http');

const auth = require('./utils/auth');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.send(`<html>
  <head>
    <title>Login</title>
  </head>
  <body>
    <form action="/login" method="post">
      <div>
        <label>Userid:</label>
        <input type="text" name="userid"/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password"/>
      </div>
      <div>
        <input type="submit" value="Log In"/>
      </div>
    </form>
  </body>
</html>`);
});

app.post('/login', (req, res, next) => {
  console.log('POST /login');
  console.log('Body:', req.body);
  next();
  },
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Login failed:', info);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log('Session error:', err);
                return next(err);
            }
            return res.redirect('/success');
        });
    })(req, res, next);
  
});


app.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Login successful');
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);
server.listen(3000);

module.exports = app;