var express = require('express');
var router = express.Router();

//Require controller modules.
var game_controller = require('../controllers/gameController');
var category_controller = require('../controllers/categoryController');


//GAME ROUTES//

//GET inventory home page
router.get('/', game_controller.index);

//GET request for creating a Game.
router.get('/game/create', game_controller.game_create_get);

//POST request for creating a Game.
router.post('/game/create', game_controller.game_create_post);

//GET request to delete a Game.
router.get('/game/:id/delete', game_controller.game_delete_get);

//POST request to delete a Game.
router.post('/game/:id/delete', game_controller.game_delete_post);

//GET request to update a Game.
router.get('/game/:id/update', game_controller.game_update_get);

//POST request to update a Game.
router.post('/game/:id/update', game_controller.game_update_post);

//GET request for one Game.
router.get('/game/:id', game_controller.game_detail);

//GET request for list of all Game items.
router.get('/games', game_controller.game_list);

//CATEGORY ROUTES//

//GET request for creating a Category.
router.get('/category/create', category_controller.category_create_get);

//POST request for creating a Category.
router.post('/category/create', category_controller.category_create_post);

//GET request to delete a Category.
router.get('/category/:id/delete', category_controller.category_delete_get);

//POST request to delete a Category.
router.post('/category/:id/delete', category_controller.category_delete_post);

//GET request to update a Category.
router.get('/category/:id/update', category_controller.category_update_get);

//POST request to update a Category.
router.post('/category/:id/update', category_controller.category_update_post);

//GET request for one Category.
router.get('/category/:id', category_controller.category_detail);

//GET request for list of all Category items.
router.get('/categories', category_controller.category_list);

module.exports = router;
