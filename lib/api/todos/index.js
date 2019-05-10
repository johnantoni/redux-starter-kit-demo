var express = require('express');
var router = new express.Router();

var todosController = require('./controller');

router.get('/', todosController.index);
router.get('/new', todosController.new);

module.exports = router;
