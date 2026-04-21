const { loginCheck }  = require('../DAL/login')
const fn_login = async (ctx, next) => {
  let data = await loginCheck(ctx);
  console.log(data,'daaataaaa');
  ctx.response.body = JSON.stringify(data)
};
const fn_register = async (ctx, next) => {
  let name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
  'GET /register': fn_register,
  'GET /login': fn_login
};
