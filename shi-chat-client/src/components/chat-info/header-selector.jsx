import React, { Component } from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            icon: this.props.header || ''
        }
        this.headerList = []
        for (var i = 0; i < 20; i++) {
            const text = `头像${i+1}`
            this.headerList.push({text, icon: require(`../../assets/images/headers/${text}.png`)})
        }
    }

    selectHeader = ({icon, text}) => {
            // 更新当前组件的状态
            this.setState({icon: text})
            // 更新父组件的状态
            this.props.setHeader(text)
        }

        render () {
            // 计算头部显示
            const icon = this.state.icon? require(`../../assets/images/headers/${this.state.icon}.png`) : null
            const gridHeader = icon ? <p>已选择头像: <img src={icon} alt="header"/></p> : '请选择头像'
            return (
                <List renderHeader={() => gridHeader}>
                    <Grid data={this.headerList}
                    columnNum={5}
                    onClick={this.selectHeader}/>
                </List>
            )
        }
}