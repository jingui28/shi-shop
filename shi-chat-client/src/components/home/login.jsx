/*
用户注册的路由组件
*/
import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'

import Logo from './logo'

export default class Register extends Component {
    state = {
        username: '',
        password: ''
    }
    // 处理输入框/单选框变化, 收集数据到state
    handleChange = (name, value) => {
        this.setState({[name]: value})
    }
    // 跳转到login 路由
    toRegister = () => {
        this.props.history.replace('/register')
    }
    // 注册
    login = () => {
        console.log(JSON.stringify(this.state))
    }

    render() {
        const {type} = this.state
        return (
            <div>
                <NavBar>直&nbsp;聘&nbsp;聊&nbsp;天</NavBar>
                <div style={{marginBottom:50, marginTop:50}}>
                <Logo></Logo>
                </div>
                
                <WingBlank>
                <List>
                <InputItem
                    placeholder='输入用户名'
                    onChange={val => this.handleChange('username', val)}
                >
                用&nbsp;户&nbsp;名:
                </InputItem>

                <WhiteSpace/>
                <InputItem
                    type='password'
                    placeholder='输入密码'
                    onChange={val => this.handleChange('password', val)}
                >
                密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:
                </InputItem>
                <WhiteSpace/>
                
                <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录
                </Button>
                
                <WhiteSpace/>
                <Button onClick={this.toRegister}>没有账号</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}