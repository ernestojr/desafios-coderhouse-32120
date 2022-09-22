var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// http://localhost:3000/datos?min=0&nivel=80&max=100&titulo=%3Ci%3ECoder%20House%3C/i%3E&color=red
router.get('/datos', function(req, res, next) {
  const { query } = req
  const data = {
    titulo: query.titulo || '<i>Medidor</i>',
    min: query.min || 10,
    nivel: query.nivel || 15,
    max: query.max || 20,
    color: query.color || 'blue',
  }
  res.render('datos', data)
});

module.exports = router;
