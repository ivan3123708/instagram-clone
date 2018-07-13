const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const session = require('express-session');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const privates = require('./config/privates');
const authenticate = require('./middleware/authenticate');

const publicPath = path.join(__dirname, 'client', 'public');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(session({
  secret: privates.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

MongoClient.connect(privates.MONGODB_URI, (err, client) => {
  if (err) console.log(err);

  console.log('Connected to MongoDB server.');

  const db = client.db();

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    db.collection('users').findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });
  passport.use(new LocalStrategy((username, password, done) => {
    db.collection('users').findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user || !bcrypt.compareSync(password, user.password)) return done('Invalid login', false);

      return done(null, user);
    });
  }));

  app.get('/api/user', (req, res) => {
    res.status(200).send(req.user);
  });

  app.post('/auth/register', (req, res, next) => {
    req.check('emailOrPhone', 'Email or phone number is required').notEmpty();
    req.check('emailOrPhone', 'Enter a valid email address.').isEmail();
    req.check('username', 'Username is required.').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Create a password at least 6 characters long.').isLength({ min: 6 });

    const errors = req.validationErrors();

    if (errors) {
      res.send(errors[0].msg);
    } else {
      db.collection('users').findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          console.log(err);
        } else if (user) {
          res.send('This username isn\'t available. Please try another.');
        }
      });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: hash,
        emailOrPhone: req.body.emailOrPhone,
      };

      db.collection('users').findOne({ username: newUser.username }, (err, user) => {
        if (err) {
          console.log(err);
        } else if (user) {
          next(null, user);
        } else {
          db.collection('users').insertOne(newUser, (err, user) => {
            if (err) {
              console.log(err);
            }
            console.log('New user registered.');
            next(null, user);
          });
        }
      });
    }
  }, authenticate, (req, res) => {
    res.status(200).send('OK');
  });

  app.post('/auth/login', (req, res, next) => {
    req.check('username', 'Username is required.').notEmpty();
    req.check('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      res.send(errors[0].msg);
    } else {
      next();
    }
  }, authenticate, (req, res) => {
    console.log('User logged in.');
    res.status(200).send('OK');
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  app.listen(port);
});
