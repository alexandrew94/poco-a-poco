const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([{
    email: 'a@a.com',
    username: 'a',
    password: 'a',
    passwordConfirmation: 'a'
  }, {
    email: 'b@b.com',
    username: 'b',
    password: 'b',
    passwordConfirmation: 'b'
  }, {
    email: 'c@c.com',
    username: 'c',
    password: 'c',
    passwordConfirmation: 'c'
  }, {
    email: 'd@d.com',
    username: 'd',
    password: 'd',
    passwordConfirmation: 'd'
  }])
    .then(users => console.log(`${users.length} burgers created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
