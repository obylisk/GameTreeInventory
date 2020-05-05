var Category = require('../models/category');
var Game = require('../models/game');
var async = require('async');


//XXXX ADD VALIDATORS?

exports.index = function(req,res) {

  async.parallel({
      game_count: function(callback) {
          Game.countDocuments({}, callback);
      },
      category_count: function(callback) {
          Category.countDocuments({}, callback);
      }
  }, function(err, results) {
      res.render('index', { title: 'Game Tree Home', error: err, data: results
      });
  });
};

//Display list of all Games.
exports.game_list = function(req, res, next) {

  Game.find()
    .populate('game')
    .sort([["title", "ascending"]])
    .exec(function (err, list_games) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('game_list', { title: 'Game List', game_list: list_games });
    });
};

//Display detail page for a specific Game.
exports.game_detail = function(req, res, next) {

    async.parallel({
        game: function(callback) {
          Game.find()
          .populate('category')
          .exec(callback);
        },

    }, function(err, results) {
        if(err) { return next(err); }
        if(results.game==null) { //No results.
            var err = new Error('Game not found.');
            err.status = 404;
            return next(err);
        }
        //Successful, so render.
        res.render('game_detail', { title: results.game.title, game: results.game }
      );
    });
};


//XXXX Fill in CRUD code

// Display game create form on GET.
exports.game_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Game create GET');
};

// Handle game create on POST.
exports.game_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Game create POST');
};

// Display game delete form on GET.
exports.game_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Game delete GET');
};

// Handle game delete on POST.
exports.game_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Game delete POST');
};

// Display game update form on GET.
exports.game_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Game update GET');
};

// Handle game update on POST.
exports.game_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Game update POST');
};
