
var Category = require('../models/category');
var Game = require('../models/game');
var async = require('async');


//XXXX ADD VALIDATORS?

//Display list of all Categories
  exports.category_list = function(req, res, next){ Category.find()
    .populate("category")
    .sort([["name", "ascending"]])
    .exec(function (err, list_categories) {
      if (err) {return next(err); }
      //Successful so render
      res.render("category_list", {title: "Category List", category_list: list_category });
    });
};

//Display detail page for a specific Category.
exports.category_detail = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id)
              .exec(callback);
        },

        category_games: function(callback) {
            Game.find({ 'category' : req.params.id
            })
              .exec(callback);
        },

    }, function(err, results) {
      if (err) { return next(err); }
      if (results.category==null) { //No results
          var err = new Error('Category not found.');
          err.status = 404;
          return next(err);
      }
      //Successful, so render.
      res.render('category_detail', { title: 'Category Detail', category: results.category, category_games: results.category_games } );
      });

};

//XXXX Fill in CRUD code
