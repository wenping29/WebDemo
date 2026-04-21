var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // next()

});
router.get('/login/', async function(req, res, next) {
  // res.send('respond with a resource');
  const { loginCheck }  = require('../DAL/login')
  let data = await loginCheck(req)
  // ctx.response.body = JSON.stringify(data)
  res.send(data)

});

module.exports = router;
