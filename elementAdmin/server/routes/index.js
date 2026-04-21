var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('home with a resource');
});
router.get('/home/', async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send('home with a resource');
  const { loginCheck }  = require('../DAL/login')
  let data = await loginCheck(req)
  // ctx.response.body = JSON.stringify(data)
  res.send(data)
});

module.exports = router;
