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
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var games = []
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

function createCategories(cb) {
    async.series([
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
          gameCreate('Ultimate One Night Werewolf', 'Social deduction games suck.', [categories[0],], 25, 1, callback);
        },
        function(callback) {
          gameCreate('Exploding Kittens', 'Kittens were harmed in the making of this game.', [categories[0],], 20, 1, callback);
        },
        function(callback) {
          gameCreate('Avalon', `"I'm a spy, or am I?"`, [categories[0],], 25, 1, callback);
        },
        function(callback) {
          gameCreate('Skull', 'A bluffing game made out of coaster mats.', [categories[0],], 7, 1, callback);
        },
        function(callback) {
          gameCreate('Sushi Go', 'Deck drafting sushi game.', [categories[0], categories[1]], 10, 1, callback);
        },
        function(callback) {
          gameCreate('Monopoly', 'This game suckssss.', [categories[1],], 1, 1, callback);
        },
        function(callback) {
          gameCreate('Spot it', 'A fun, fast game about matching.', [categories[1],], 5, 1, callback);
        },
        function(callback) {
          gameCreate('Hanabi', `This game isn't really for kids..`, [categories[1],], 25, 1, callback);
        },
        function(callback) {
          gameCreate('Magic Maze', 'A game about a magical maze, I guess.', [categories[1],], 50, 1, callback);
        },
        function(callback) {
          gameCreate('Ghost Blitz', 'A speed game where you have to be the first to grab an item.', [categories[1],], 8, 1, callback);
        },
        function(callback) {
          gameCreate('Quirkle', 'Scrabble for dyslexic people.', [categories[2],], 25, 1, callback);
        },
        function(callback) {
          gameCreate('Splendor', `A great beginner's game about simple engine building.`, [categories[2],], 25, 1, callback);
        },
        function(callback) {
          gameCreate('Clank!', 'A deck building dungeon crawler.', [categories[2],], 500, 1, callback);
        },
        function(callback) {
          gameCreate('Dominion', 'A deck building engine builder.', [categories[2],], 50, 1, callback);
        },
        function(callback) {
          gameCreate('Carcassone', 'Build Carcassone with tiles.', [categories[2],], 25, 1, callback);
        },
        function(callback) {
          gameCreate('Tapestry', 'Has nothing to do with tapestries.', [categories[3],], 2.50, 1, callback);
        },
        function(callback) {
          gameCreate('Terraforming Mars', 'An epic game about terraforming Mars.', [categories[3],], 999.25, 1, callback);
        },
        function(callback) {
          gameCreate('Underwater Cities', 'Build cities UNDERWATER!', [categories[3],], 250, 1, callback);
        },
        function(callback) {
          gameCreate('Nemesis', 'A cooperative game in the Alien universe.', [categories[3],], 25, 1, callback);
        },
        function(callback) {
          gameCreate('Innovation', 'A card game with infinite replayabilibty!', [categories[3],], 29.99, 1, callback);
        },

        ],
        // optional callback
        cb);
}



async.series([
    createCategories,
    createGames
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Done');

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
