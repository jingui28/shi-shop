md5 = require('blueimp-md5')

// 使用mongoose 操作mongodb 的测试文件
// 1. 连接数据库
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect('mongodb://127.0.0.1:27017/chat')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', () => {
    console.log('Connected Success!');
})
// 2. 得到对应特定集合的Model
// 2.1. 字义Schema(描述文档结构)
const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: { type: String, required: true}
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', UserSchema) //  集合名: users
// 3. 通过Model 或其实例对集合数据进行CRUD 操作
// 3.1. 通过Model 实例的save()添加数据
function testSave(){
    const user = {
        username: 'zhang san',
        password: md5('123'),
        type: '0'
    }
    const userModel = new UserModel(user)
    userModel.save(function(err, user){
        console.log('save', err, user);
    })
}

 testSave()
// 3.2. 通过Model 的find()/findOne()查询多个或一个数据
function testFind(){
    UserModel.find(function(err, users){
        console.log('find', err, users);
    })

    UserModel.findOne({_id: "5f7ba6a0aada8b2560392f07"}, function(err, user){
        console.log('findOne', err, user);
    })

}

// testFind()
// 3.3. 通过Model 的findByIdAndUpdate()更新某个数据
function testUpdate(){
    UserModel.findByIdAndUpdate({_id: "5f7ba6a0aada8b2560392f07"}, {username: "Li Si"}, function(err, user){
        console.log('findByIdAndUpdate', err, user);
    })
}


testUpdate()
// 3.4. 通过Model 的remove()删除匹配的数据
function testDelete(){
    UserModel.remove({_id:"5f7ba6a0aada8b2560392f07"}, function(err, result){
        console.log('delete', err, result);
    })
}

testDelete()
