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
        password: '',
        password2: '',
        type: 'dashen'
    }
    // 处理输入框/单选框变化, 收集数据到state
    handleChange = (name, value) => {
        this.setState({[name]: value})
    }
    // 跳转到login 路由
    toLogin = () => {
        this.props.history.replace('/login')
    }
    // 注册
    register = () => {
        console.log(JSON.stringify(this.state))
    }

    render() {
        const {type} = this.state
        return (
            <div>
                <NavBar>直&nbsp;聘&nbsp;聊&nbsp;天</NavBar>
                <Logo></Logo>
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
                <InputItem
                    type='password'
                    placeholder='输入确认密码'
                    onChange={val => this.handleChange('password2', val)}
                >
                确认密码:
                </InputItem>
                <WhiteSpace/>
                <List.Item>
                    <span style={{marginRight: 30}}>用户类型:</span>
                    <Radio checked={this.state.type==='dashen'}
                    onClick={() => {this.handleChange('type', 'dashen')}}>求职</Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio checked={this.state.type==='laoban'}
                    onClick={() => {this.handleChange('type', 'laoban')}}>招聘</Radio>
                </List.Item>

                <WhiteSpace/>
                <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册
                </Button>
                
                <WhiteSpace/>
                <Button onClick={this.toLogin}>已经有账号</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}