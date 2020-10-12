import React, { Component } from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from './header-selector'
import { updateUser } from "../../redux/actions";

class ApplicantInfo extends Component {
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '' // 职位名称
    }

    handleChange = (name, val) => {
        this.setState({[name]: val})
    }

    handleClick = () => {
        this.props.updateUser(this.state)
        return <Redirect to='/applicant' />
    }

    setHeader = (header) => {
        this.setState({header})
    }

    render() {
        // const {user} = this.props
        // // 如果用户信息已完善, 自动跳转到大神主界面
        // if (user.header) {
        //     return <Redirect to='/applicant'/>
        // }

        return (
            <div>
                <NavBar type='primary'>招聘信息</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val => this.handleChange('post', val)}>招聘职位:</InputItem>
                <TextareaItem title="职位要求:" onChange={val => this.handleChange('info', val)}/>
                <Button type='primary' onClick={this.handleClick}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state =>({user: state.user}),
    {updateUser}
)(ApplicantInfo)