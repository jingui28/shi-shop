/*
包含所有action creator 函数的模块
*/
import {
AUTH_SUCCESS,
ERROR_MSG,
RECEIVE_USER,
RESET_USER
} from './action-types'

import {
reqRegister,
reqLogin, reqUpdateUser
} from '../api'

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})      // 同步成功响应
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})        // 同步错误消息
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})        // 同步接收用户
const resetUser = (msg) => ({type: RESET_USER, data: msg})      // 同步重置用户

/*
异步注册
*/

export function register({username, password, password2, type}) {
    // 进行前台表单验证, 如果不合法返回一个同步action 对象, 显示提示信息
    if (!username) {return errorMsg('用户名不能为空！')} 
    else if (!password) {return errorMsg('密码不能为空！')}
    else if (!type) {return errorMsg('类型不能为空！')} 
    else if (password !== password2) {return errorMsg('密码和确认密码不同')} 
    else {
        return async dispatch => {
            const response = await reqRegister({username, password, type})
            const result = response.data
            if (result.code === 0) {
                dispatch(authSuccess(result.data))
            } else {
                dispatch(errorMsg(result.msg))
            }
        }
    }
    
}

/*
异步登陆
*/
export function login({username, password}) {
    if (!username) {return errorMsg('用户名不能为空！')} 
    else if (!password) {return errorMsg('密码不能为空！')}
    else {
        return async dispatch => {
            const response = await reqLogin({username, password})
            const result = response.data
            if (result.code === 0) {
                dispatch(authSuccess(result.data))
            } else {
                dispatch(errorMsg(result.msg))
            }
        }
    }
}

/*
异步更新用户
*/
export function updateUser(user){
    console.log(user);
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}