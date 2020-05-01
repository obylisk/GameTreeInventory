var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategoriesSchema = new Schema(
  {
    name: {type: String, required: true, min: 3, max: 100}
});



// Virtual for game's URL
CategoriesSchema
.virtual('url')
.get(function () {
  return '/invetory/categories/' + this._id;
});



//Export model
module.exports = mongoose.model('Categories', CategoriesSchema);
