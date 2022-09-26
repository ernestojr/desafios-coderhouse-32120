var express = require('express');
const Socket = require('../Socket');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/eventos/:id', function(req, res) {
  Socket.emit(req.params.id, req.body.evento, req.body.mensaje)
  res.status(204).end();
});

module.exports = router;
