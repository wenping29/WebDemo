# WebapiDemo

#### 介绍
使用ASP.NET CORE构建的webapi后端项目，学习使用

#### 软件架构
软件架构说明

### v0.0.0.1
搭建项目，利用postman测试接口能否成功通信
增加Swagger查看接口信息

### v0.0.0.2
增加docker容器和JWT凭证




#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


### dapper
关键方法详解

方法	描述	示例
Query<T>	返回实体列表	connection.Query<Product>("SELECT * FROM Products")
QueryFirst<T>	返回第一条结果（无结果抛异常）	connection.QueryFirst<Product>("SELECT ... WHERE Id=@id", new {id=1})
QueryFirstOrDefault<T>	返回第一条或默认值（无结果返回 null）	connection.QueryFirstOrDefault<Product>(...)
QuerySingle<T>	返回单条结果（结果不唯一抛异常）	适用于主键查询
Execute	执行非查询操作（增删改），返回受影响行数	connection.Execute("DELETE FROM Products WHERE Id=@id", new {id=10})
ExecuteScalar<T>	返回单个值（如 COUNT、SUM）	int count = connection.ExecuteScalar<int>("SELECT COUNT(*) FROM Products")

