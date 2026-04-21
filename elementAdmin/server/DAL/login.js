// const mysql = require('mysql')
const { allServices } = require('../db/mysqlHelper')
const userSQL = require('../db/sql')
const loginCheck = (ctx)=>{
  return new Promise((res,err) => {
    let userCode = ctx.request.query.userCode
    let pwd = ctx.request.query.pwd
    let result ={}
    allServices.query(userSQL.queryAll).then((data) => {
      if(data) {
        if(data.filter(v => v.userCode === userCode).length === 0){
          result = {state:'noUser',msg: '用户不存在'}
        } else if(data.filter(v => v.userCode === userCode && v.passWord === pwd).length > 0) {
          result = {state: 'success',msg: '登陆成功'}
        } else {
          result =  {state: '登录失败',msg: '登录失败'}
        } 
      } else {
        result =  {state: '登录失败',msg: '登录失败'}
      }
      res(result)
    }).catch(e => {
      result =  {state: '登录失败',msg: e}
      err(result)
    })
  })
}

module.exports = {
  loginCheck
};