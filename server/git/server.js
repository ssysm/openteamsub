const path = require('path');
const Server = require('node-git-server');

const {
    userAuth
} = require('./controllers');

const repos = new Server(path.resolve(__dirname, 'tmp'), {
    autoCreate: true,
    authenticate: userAuth
});

module.exports = repos;