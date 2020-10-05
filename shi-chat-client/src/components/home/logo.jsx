import React from 'react'

import logo from '../../assets/images/logo/shi.png'
import '../../assets/style/logo.css'
/*
简单的显示logo 的组件
*/
export default class Logo extends React.Component {
    render () {
        return (
            <div className="logo-container">
                <img src={logo} alt="logo" className='logo-img'/>
            </div>
        )
    }
}