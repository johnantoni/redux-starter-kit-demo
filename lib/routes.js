const express = require("express");
const Router = express.Router;
const router = Router();

router.use('/p1/todos', require('./api/todos'));

module.exports = router;
