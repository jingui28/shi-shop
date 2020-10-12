/*
应用主界面路由组件
*/
import React, {Component} from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Cookies from 'js-cookie'

import ApplicantInfo from '../chat-info/applicant-info'
import RecruitInfo from '../chat-info/recruit-info'
import Applicant from '../chat/applicant'
import Recruit from '../chat/recruit'
import Message from '../chat/message'
import Personal from '../chat/personal'
import NotFound from '../chat/not-found'

export default class Main extends Component {
    render() {
         //如果浏览器中没有保存userid 的cookie, 直接跳转到login
         const userid = Cookies.get('userid')
        if (!userid) {
            this.props.history.replace('/')
            return null
        }

        return (
            <div>
                <Switch>
                    <Route path='/applicantinfo' component={ApplicantInfo}/>
                    <Route path='/recruitinfo' component={RecruitInfo}/>
                    <Route path='/applicant' component={Applicant}/>
                    <Route path='/recruit' component={Recruit}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        )
    }
}