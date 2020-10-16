import React, { Component } from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from './header-selector'
import { updateUser } from "../../redux/actions";

class ApplicantInfo extends Component {
    state = {
        header: this.props.user.header || '', // 头像名称
        info: this.props.user.info || '', // 职位简介
        post: this.props.user.post || '', // 职位名称
        status: 0
    }

    handleChange = (name, val) => {
        this.setState({[name]: val})
    }

    handleClick = () => {
        this.setState({status: 1})
        this.props.updateUser(this.state)
    }

    setHeader = (header) => {
        this.setState({header})
    }

    render() {
        const {status, info, post, header} = this.state
        // 如果用户信息修改完成，跳转到applicant主界面
        if (status===1) {
            return <Redirect to='/applicant'/>
        }

        return (
            <div>
                <NavBar type='primary'>求职信息</NavBar>
                <HeaderSelector header={header} setHeader={this.setHeader}/>
                <InputItem value={post} onChange={val => this.handleChange('post', val)}>应聘职位:</InputItem>
                <TextareaItem value={info} title="个人技能:" onChange={val => this.handleChange('info', val)}/>
                <Button type='primary' onClick={this.handleClick}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state =>({user: state.user}),
    {updateUser}
)(ApplicantInfo)