这是用koa写的一个web api基本骨架，便于快速开发项目，目录结构如下

- config  配置
- controller 控制器
- exception 异常
- global 全局组件，包括db、redis、logger、session的定义
- logs 日志目录 
    - app业务层日志
    - access_log 请求日志
    - error 错误日志
- middleware 中间件
- model 模型
- router 路由
- utils 函数工具等助手函数


骨架引入的组件如下:
- koa、koa-router、koa-bodyparser
- mysql2   操作mysql
- dotenv  env配置文件，可以从.env文件引入配置
- ioredis 操作redis的库
- continuation-local-storage 线程内作用域变量，实现session
- winston 日志库
- uuid  唯一id库，骨架里面主要用来日志里面记录requestId，便于快速查看当次请求日志


Model层做了薄薄的封装，提供了几个基本的方法，

```javascript
Create(data)
Destroy(pks)
Save(data)
Find(pk)
FindAll(pks)
FindBySql(sql,values)
```

业务Model继承Model类:

```javascript
const Model = require("./model");

class User extends Model  {
    TABLE_NAME = "users"; // 如果不定义，默认是model类名的小写形式
    PRIMARY_KEY = "uid"; //主键，如果不定义，默认是id
}

module.exports = new User;
```
使用方法如下:

- 新增
```javascript
let user = await User.Create({
    username:"json",
    age:32
});

let user = await User.Save({
    username:"json",
    age:32
});
```
- 根据主键删除
```javascript
let affect_nums = await User.Destroy(1);// 根据主键删除一条数据

let affect_nums = await User.Destroy([1,2,3]);// 根据主键删除多条数据

```

- 根据主键修改
// Save方法，如果数据里面有id表示要修改，没有则表示要新增
```javascript
let user = await User.Save({
    id:"1",
    username:"json",
    age:32
});

```
- 根据主键查询一条数据
```javascript
let user = await User.Find(1);

```
- 根据主键查询多条数据
```javascript
let users = await User.FindAll([1,2,3]);

```
- 根据sql查询数据
```javascript
let users = await User.FindBySql("select * from users where username=?",["json"]);

let users = await User.FindBySql("select * from users where username=? and age=?",["json",32]);
```