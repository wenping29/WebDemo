var UserSQL = {
  insert: 'INSERT INTO userInfo(uid,userName) VALUES(?,?)', // 插入数据
  drop: 'DROP TABLE userInfo', // 删除表中所有的数据
  queryAll: 'SELECT * FROM userInfo', // 查找表中所有数据
  getUserById: 'SELECT * FROM userInfo WHERE userCode =?', // 查找符合条件的数据
};
module.exports = UserSQL