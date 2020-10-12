import React, { Component } from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from './header-selector'
import { updateUser } from "../../redux/actions";

class RecruitInfo extends Component {
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资
    }

    handleChange = (name, val) => {
        this.setState({[name]: val})
    }

    handleClick = () => {
        this.props.updateUser(this.state)
        console.log('AAAAAAAAAAA');
        return <Redirect to='/recruit' />
    }

    setHeader = (header) => {
        this.setState({header})
    }

    render() {

        return (
            <div>
                <NavBar type='primary'>招聘信息</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val => this.handleChange('post', val)}>招聘职位:</InputItem>
                <InputItem onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
                <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
                <TextareaItem title="职位要求:" onChange={val => this.handleChange('info', val)}/>
                <Button type='primary' onClick={this.handleClick}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state =>({user: state.user}),
    {updateUser}
)(RecruitInfo)