/*
Recruit的主路由组件
*/
import React from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'
import UserList from './user-list'

class Recruit extends React.Component {

    componentDidMount() {
        this.props.getUserList('0')
    }

    render() {
        return <UserList userList={this.props.userList}></UserList>
    }

}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Recruit)