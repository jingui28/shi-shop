var express = require('express');
var router = express.Router();

// 引入md5 加密函数库
const md5 = require('blueimp-md5')
// 引入UserModel
const {UserModel, ChatModel} = require('../db/models')

const filter = {password: 0} // 查询时过滤出指定的属性

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res) {
  // 1. 获取请求参数数据(username, password, type)
  const {username, password, type} = req.body
  // 2.1. 根据username 查询数据库, 看是否已存在user
  UserModel.findOne({username}, function(err, user){
    if (user) {
      // 3.1. 如果存在, 返回一个提示响应数据: 此用户已存在
      res.send({code:1, msg:"此用户已存在！"})
    } else {
      // 2.2. 如果不存在, 将提交的user 保存到数据库
      new UserModel({username, type, password: md5(password)}).save(function(err, user) {
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})   // 持久化cookie, 浏览器会保存在本地文件
        // 3.2. 保存成功, 返回成功的响应数据: user
        res.send({code: 0, data: {_id: user._id, username, type}})   // 返回的数据中不要携带pwd
      })
    }
  })
});

router.post('/login', function(req, res) {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)}, filter, function(err, user) {
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      res.send({code: 0, data: user})
    } else {
      res.send({code: 1, msg: '用户名或密码错误'})
    }
  })
  
})

router.post('/update', function(req, res){
  // 得到请求cookie 的userid
  const userid = req.cookies.userid
  // 如果没有, 说明没有登陆, 直接返回提示
  if (!userid) {
    res.send({code: 1, msg: '请先登录！'})
  }
  // 如果有， 更新数据库中对应的数据
  UserModel.findByIdAndUpdate({_id: userid}, req.body, function(err, user){
    const {_id, username, type} = user    // user是数据库中原来的数据
    const data = Object.assign(req.body, {_id, username, type})   // assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
    res.send({code: 0, data})
  })
})

// 根据cookie 获取对应的user
router.get('/user', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    res.send({code: 1, msg: '请先登录！'})
  }
  UserModel.findOne({_id: userid}, filter, function(err, user){
    res.send({code: 0, data: user})
  })
})

// 根据type 获取对应的userList
router.get('/list', function(req, res){
  const {type} = req.query
  UserModel.find({type}, filter, function(err, users){
    res.send({code: 0, data: users})
  })
})
/*
获取当前用户所有相关聊天信息列表
*/
router.get('/msglist', function (req, res) {
  // 获取cookie 中的userid
  const userid = req.cookies.userid
  // 查询得到所有user 文档数组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有user 信息: key 为user 的_id, val 为name 和header 组成的user 对象
    const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {username: doc.username, header: doc.header}
    })
    /*
    查询userid 相关的所有聊天信息
    参数1: 查询条件
    参数2: 过滤条件
    参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})
/*
修改指定消息为已读
*/
router.post('/readmsg', function (req, res) {
  // 得到请求中的from 和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
  更新数据库中的chat 数据
  参数1: 查询条件
  参数2: 更新为指定的数据对象
  参数3: 是否1 次更新多条, 默认只更新一条
  参数4: 更新完成的回调函数
  */
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) // 更新的数量
  })
})

module.exports = router;
