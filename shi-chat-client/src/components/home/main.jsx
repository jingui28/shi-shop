/*
应用主界面路由组件
*/
import React, {Component} from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'

import NavFooter from '../chat/nav-footer'
import { getUser } from "../../redux/actions"
import {getRedirectPath} from '../../utils/index'

import ApplicantInfo from '../chat-info/applicant-info'
import RecruitInfo from '../chat-info/recruit-info'
import Applicant from '../chat/applicant'
import Recruit from '../chat/recruit'
import Message from '../chat/message'
import Personal from '../chat/personal'
import Chat from '../chat/chat'
import NotFound from '../chat/not-found'

class Main extends Component {
    // 组件类和组件对象
    // 给组件对象添加属性
    navList = [
        {
        path: '/recruit', // 路由路径
        component: Recruit,
        title: '求职列表',
        icon: 'dashen',
        text: '求职',
        },
        {
        path: '/applicant', // 路由路径
        component: Applicant,
        title: '招聘列表',
        icon: 'laoban',
        text: '招聘',
        },
        {
        path: '/message', // 路由路径
        component: Message,
        title: '消息列表',
        icon: 'message',
        text: '消息',
        },
        {
        path: '/personal', // 路由路径
        component: Personal,
        title: '用户中心',
        icon: 'personal',
        text: '个人',
        }
    ]

    componentDidMount() {
        // cookie 中有userid
        // redux 中的user 是空对象
        const userid = Cookies.get('userid')
        const {user} = this.props
        if (userid && !user._id) {
        this.props.getUser() // 获取user 并保存到redux 中
        }
    }

    render() {
         //如果浏览器中没有保存userid 的cookie, 直接跳转到login
         const userid = Cookies.get('userid')
        if (!userid) {
            this.props.history.replace('/')
            return null
        }

        // cookie 中有userid
        // redux 中的user 是否有数据
        const {user} = this.props
        const pathname = this.props.location.pathname
        if (!user._id) {
            return null // 不做任何显示
        } else {
            // 请求根路径时, 自动跳转到对应的用户主界面
            if (pathname === '/main2') {
            const path = getRedirectPath(user.type, user.header)
            return <Redirect to={path}/>
            }
        }

        // 指定哪个nav 应该被隐藏   
        if (user.type === '1') {
            this.navList[1].hide = true
        } else {
            this.navList[0].hide = true
        }
        
            // 得到当前的nav
            const currentNav = this.navList.find(nav => nav.path === pathname)
            // 得到props 中的unReadCount
            const unReadCount = this.props.unReadCount<0 ? 0 : this.props.unReadCount

        return (
            <div>
                {currentNav? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                <Switch>
                    <Route path='/applicantinfo' component={ApplicantInfo}/>
                    <Route path='/recruitinfo' component={RecruitInfo}/>
                    <Route path='/applicant' component={Applicant}/>
                    <Route path='/recruit' component={Recruit}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav? <NavFooter className='stick-top' unReadCount={unReadCount} navList={this.navList} /> : null}
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        unReadCount: state.chat.unReadCount // 未读消息数量
    }),
    {getUser}
)(Main)