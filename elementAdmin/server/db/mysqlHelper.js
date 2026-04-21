var mysql = require('mysql');
var dbConfig = require('./DBConfig');
// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool( dbConfig.mysql );
let allServices = {
  query: function (sql, values) {
      return new Promise((resolve, reject) => {
          pool.getConnection(function (err, connection) {
              if (err) {
                  reject(err)
              } else {
                  connection.query(sql, values, (err, rows) => {

                      if (err) {
                          reject(err)
                      } else {
                          resolve(rows)
                      }
                      connection.release()
                  })
              }
          })
      })

  },
 findUserData: function (name) {
      let _sql = `select * from users where name="${name}";`
      return allServices.query(_sql)
  },
  addUserData: (obj) => {
       let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
       return allServices.query(_sql, obj)
   },
}

module.exports = {
  allServices
}