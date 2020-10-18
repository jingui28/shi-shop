/*
包含n 个接口请求函数的模块
每个函数返回的都是promise 对象
*/
import ajax from './ajax'

export const reqLogin = (user) => ajax('/login', user, 'POST')     // 请求登陆
export const reqRegister = (user) => ajax('/register', user, 'POST')       // 请求注册
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')        // 更新用户信息
export const reqGetUser = () => ajax('/user')       // 请求用户信息
export const reqUserList = (type) => ajax('/list', {type})      // 请求获取用户列表
export const reqChatMsgList = () => ajax('/msglist')    // 请求获取当前用户的所有聊天记录
export const reqReadChatMsg = (from) => ajax('/readmsg', {from}, 'POST')        // 标识查看了指定用户发送的聊天信息
