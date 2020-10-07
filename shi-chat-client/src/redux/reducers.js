/*
包含n 个根据老的state 和action 返回新的state 的函数的模块
*/
import {combineReducers} from 'redux'

import {
AUTH_SUCCESS,
ERROR_MSG
} from './action-types'

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data, redirectTo: '/'}
        case ERROR_MSG:
            return {...state, msg: action.data}
        default:
            return state
    }
        
}

// 返回合并后的reducer 函数
export default combineReducers({
user
})