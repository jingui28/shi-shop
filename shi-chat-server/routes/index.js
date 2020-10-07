var express = require('express');
var router = express.Router();

// 引入md5 加密函数库
const md5 = require('blueimp-md5')
// 引入UserModel
const {UserModel} = require('../db/models')

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
});

module.exports = router;
