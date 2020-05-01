#! /usr/bin/env node

console.log('This script populates some test games to my database. Specified database as argument - e.g.: Node populatedb mongodb+srv://Jake:Stannard@cluster0-rzb8w.mongodb.net/inventory?retryWrites=true&w=majority');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Game = require('./models/game')
var GameCopy = require('./models/gamecopy')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var games = []
var gamecopies = []
var categories = []

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  });
}

function gameCreate(title, description, category, price, numberOfCopies, cb) {
  gamedetail = {
    title: title,
    description: description,
    price: price,
    numberOfCopies: numberOfCopies
}

if (category != false) gamedetail.category = category

  var game = new Game(gamedetail);

  game.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Game: ' + game);
    games.push(game)
    cb(null, game)
  });
}



function gameCopyCreate(game, due_back, status, cb) {
  gamecopydetail = {
    game: game,
  }
  if (due_back != false) gamecopydetail.due_back = due_back
  if (status != false) gamecopydetail.status = status

  var gamecopy = new GameCopy(gamecopydetail);
  gamecopy.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Game Copy: ' + gamecopy);
      cb(err, null)
      return
    }
    console.log('New Game Copy: ' + gamecopy);
    gamecopies.push(gamecopy)
    cb(null, game)
  }  );
}


function createCategories(cb) {
    async.parallel([
        function(callback) {
          categoryCreate('Party', callback);
        },
        function(callback) {
          categoryCreate('Kids', callback);
        },
        function(callback) {
          categoryCreate('First Time', callback);
        },
        function(callback) {
          categoryCreate('Strategy', callback);
        },
        ],
        // optional callback
        cb);
}


function createGames(cb) {
    async.parallel([
        function(callback) {
          gameCreate('Ultimate One Night Werewolf', 'Social deduction games suck', [categories[0],], 50, 3, callback);
        },
        ],
        // optional callback
        cb);
}


function createGameCopies(cb) {
    async.parallel([
        function(callback) {
          gameCopyCreate(games[0], 'Available', callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([

    createGames
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('GAMECopies: '+gamecopies);

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
