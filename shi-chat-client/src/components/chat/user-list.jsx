/*
用户列表的UI 组件
*/
import React from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import PropTypes from 'prop-types'

const Header = Card.Header
const Body = Card.Body

export default class UserList extends React.Component {
    static propsTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        return (
            <WingBlank style={{marginTop: 50, marginBottom: 50}}>
                {
                    this.props.userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Header
                                thumb = {user.header? require(`../../assets/images/headers/${user.header}.png`) : null}
                                extra = {user.username}
                            />
                            <Body>
                                <div>职位: {user.post}</div>
                                {user.company ? <div>公司: {user.company}</div> : null}
                                {user.salary ? <div>月薪: {user.salary}</div> : null}
                                <div>描述: {user.info}</div>
                            </Body>
                        </div>
                    ))
                }
                
            </WingBlank>
        )
        
    }
}