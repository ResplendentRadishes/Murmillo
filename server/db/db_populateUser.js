var Promise = require('bluebird');

var db = require('./db.js');
var User = require('./user.js');


var vernon = {
  githubId: '22604159',
  email: 'vernonquan@gmail.com',
  githubUrl: 'https://github.com/VernonQuan',
  score: 125,
  username: 'Vernon Quan',
  avatarUrl: 'https://avatars.githubusercontent.com/u/22604159?v=3'
};
var yoshi = {
  githubId: '20877349',
  email: 'yoshioritatsu@gmail.com',
  githubUrl: 'https://github.com/YoshiOri7',
  score: 125,
  username: 'Yoshi Oritatsu',
  avatarUrl: 'https://avatars.githubusercontent.com/u/20877349?v=3'
};
var robert = {
  githubId: '22568358',
  email: null,
  githubUrl: 'https://github.com/rmaierlit',
  score: 125,
  username: 'Robert Littlejohn',
  avatarUrl: 'https://avatars.githubusercontent.com/u/22568358?v=3'
};
var nimmy = {
  githubId: '12091165',
  email: 'nimmyissac2014@gmail.com',
  githubUrl: 'https://github.com/nimmyissac',
  score: 125,
  username: 'Nimmy Issac',
  avatarUrl: 'https://avatars.githubusercontent.com/u/12091165?v=3'
}
var initialUsers = [vernon, yoshi, robert, nimmy];

console.log('------------------- Populate User table ------------------- ');

User.sync()
.then(() => {
  return Promise.all(initialUsers.map(user => {
    return User.create(user)
  }));
})
.catch(function(err) {
  console.error(err);
});