var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    description: {type: String, required: false},
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    price: {type: Number, required: true},
    numberOfCopies: {type: Number, required: true},
  }
);



// Virtual for game's URL


//Export model
module.exports = mongoose.model('Game', GameSchema);
