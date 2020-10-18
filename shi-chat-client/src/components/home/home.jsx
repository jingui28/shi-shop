
import React, {Component} from 'react'
import { NavLink, Redirect } from "react-router-dom"
import Cookies from 'js-cookie'

import logo from '../../assets/images/logo/shi.png'
import chat from '../../assets/images/logo/chat.jpg'

import '../../assets/style/reset.css'
import '../../assets/style/home.css'

export default class Home extends Component {
    render() {
        //如果浏览器中没有保存userid 的cookie, 直接跳转到login
        const userid = Cookies.get('userid')
       if (userid) {
           return <Redirect to='/main2' />
       }
        return (
            <div className="home">
                <img className="logo" src={logo} alt='logo' />
                <div className='link'>
                    <NavLink to='/login'>登录</NavLink>&nbsp;|&nbsp;
                    <NavLink to='/register'>注册</NavLink>
                </div>
                <div className='chat'>
                    <img src={chat} alt='chat' />
                </div>
                <div className='message'>
                   <p> 招聘者</p>
                   <p className='p2'>与求职者</p>
                </div>
                <div className='message2'>聊天</div>
            </div>
        )
    }
}