const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const private = require('./config/private');

const app = express();

const port = process.env.PORT || 3000;

passport.use(new FacebookStrategy({
  clientID: private.facebookAuth.clientID,
  clientSecret: private.facebookAuth.clientSecret,
  callbackURL: private.facebookAuth.callbackURL
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.listen(port, () => {
  console.log('Server is running now...');
});