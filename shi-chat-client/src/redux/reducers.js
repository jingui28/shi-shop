/*
包含多个用于生成新的state 的reducer 函数的模块
*/
import {combineReducers} from 'redux'

function xxx(state = 0, action) {
return state
}

function yyy(state = 0, action) {
return state
}

// 返回合并后的reducer 函数
export default combineReducers({
xxx,
yyy
})