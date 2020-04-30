var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    description: {type: String, required: false},
    category: [{type: Schema.ObjectId, ref: 'Category'}]
    price: {type: Number, required: true},
    numberOfCopies: {type: Number, required: true},
  }
);



// Virtual for game's URL
GameSchema
.virtual('url')
.get(function () {
  return '/invetory/games/' + this._id;
});

//Export model
module.exports = mongoose.model('Games', GameSchema);
