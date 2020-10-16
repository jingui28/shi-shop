/*
包含n 个根据老的state 和action 返回新的state 的函数的模块
*/
import {combineReducers} from 'redux'

import {
AUTH_SUCCESS,
ERROR_MSG,
RECEIVE_USER,
RECEIVE_USER_LIST,
RESET_USER
} from './action-types'

import { getRedirectPath } from "../utils";

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const redirectTo = getRedirectPath(action.data.type, action.data.header)
            return {...action.data, redirectTo}
        case ERROR_MSG:
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state
    }
        
}

const initUserList = []
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

// 返回合并后的reducer 函数
export default combineReducers({
user,
userList
})