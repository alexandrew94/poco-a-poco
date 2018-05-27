const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');
const Piece = require('../models/piece');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  let seededUsers = [];

  User.create([{
    email: 'a@a',
    username: 'a',
    password: 'a',
    passwordConfirmation: 'a'
  }, {
    email: 'b@b',
    username: 'b',
    password: 'b',
    passwordConfirmation: 'b'
  }, {
    email: 'c@c',
    username: 'c',
    password: 'c',
    passwordConfirmation: 'c'
  }])
    .then(users => {
      console.log(`${users.length} users created`);
      seededUsers = users;

      return Piece.create([{
        title: 'piece1',
        composer: 'composer1',
        description: 'description1',
        user: seededUsers[0],
        diary: [{
          timeLogged: 'Today',
          timePracticed: 10,
          notes: 'diaryentry1'
        }, {
          timeLogged: 'Today',
          timePracticed: 20,
          notes: 'diaryentry2'
        }]
      }, {
        title: 'piece2',
        composer: 'composer2',
        description: 'description2',
        user: seededUsers[0]
      }, {
        title: 'piece3',
        composer: 'composer3',
        description: 'description3',
        user: seededUsers[1]
      }, {
        title: 'piece4',
        composer: 'composer4',
        description: 'description4',
        user: seededUsers[1]
      }])
        .then(users => {
          console.log(`${users.length} users created`);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
