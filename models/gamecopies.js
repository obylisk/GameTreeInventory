var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var GameCopiesSchema = new Schema(
  {
    // Reference to the associated game.
    game: { type: Schema.ObjectId, ref: 'Game', required: true },
    status: {type: String, required: true, enum:['Available', 'Rented'], default:'Available'},
    due_back: { type: Date, default: " " },
  });



// Virtual for game's URL
GameCopiesSchema
.virtual('url')
.get(function () {
  return '/invetory/gamecopies/' + this._id;
});

//XXXX format this the way I'd like
GameCopiesSchema
.virtual('due_back_formatted')
.get(function () {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

//Export model
module.exports = mongoose.model('GameCopies', GameSchema);
