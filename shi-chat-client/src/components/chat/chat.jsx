/*
对话聊天的路由组件
*/
import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'

import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state = {
    content: '', //输入的聊天内容
    isShow: false // 是否显示表情列表
    }

    UNSAFE_componentWillMount () {
        this.emojis = ['😀', '😄', '😆', '😂', '🤩', '😜', '❤', 
        '😀', '😄', '😆', '😂', '🤩', '😜', '❤',
        '😀', '😄', '😆', '😂', '🤩', '😜', '❤',
        '😀', '😄', '😆', '😂', '🤩', '😜', '❤',
        '😀', '😄', '😆', '😂', '🤩', '😜', '❤',]
        this.emojis = this.emojis.map(value => ({text: value}))
        // console.log(this.emojis)
    }

    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
        this.props.readMsg(this.props.match.params.userid)
    }

    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() {
        this.props.readMsg(this.props.match.params.userid)
    }

    submit = () => {
        const content = this.state.content.trim()
        const to = this.props.match.params.userid
        const from = this.props.user._id
        this.props.sendMsg({from, to, content})
        this.setState({isShow: false, content: ''})
    }
    render() {
        const {user} = this.props
        const {chatMsgs, users} = this.props.chat
        const targetId = this.props.match.params.userid
        if(!users[targetId]) { return null }
        const meId = user._id
        const chatId = [targetId, meId].sort().join('_')
        const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)
        const targetIcon = users[targetId] ? require(`../../assets/images/headers/${users[targetId].header}.png`) : null
        const myIcon = users[meId] ? require(`../../assets/images/headers/${users[meId].header}.png`) : null
        return (
            <div id='chat-page'>
                <NavBar
                    className='stick-top'
                    icon={<Icon type='left'/>}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>

                <List style={{marginBottom:50, marginTop:50}}>
                    {
                        msgs.map(msg => {
                            if(msg.from===targetId) {
                                return (
                                    <Item
                                    key={msg._id}
                                    thumb={targetIcon}
                                    >
                                    {msg.content}
                                    </Item>
                                )
                            } else {
                                return (
                                    <Item
                                    key={msg._id}
                                    className='chat-me'
                                    extra={<img src={myIcon} alt='' style={{width: 25, height: 25}} />}
                                    >
                                    {msg.content}
                                    </Item>
                                )
                            }
                        })
                    }
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                        onFocus={() => this.setState({isShow: false})}
                        extra={
                        <span>
                            <span onClick={this.toggleShow} style={{marginRight: 10}}>😀</span>
                            <span onClick={this.submit}>发送</span>
                        </span>
                        }
                    />
                </div>
                {
                    this.state.isShow ? (
                        <Grid style={{position: 'fixed', bottom: 60}}
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => { this.setState({content: this.state.content + item.text}) }}
                        />
                    ) : null
                }
            </div>
        )
    }
        // 切换表情列表的显示
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
        // 异步手动派发resize 事件,解决表情列表显示的bug
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat)