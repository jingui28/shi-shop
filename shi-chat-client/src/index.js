import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Switch, Route} from 'react-router-dom'

import './assets/css/index.css'
import store from './redux/store'
import Login from '../src/components/home/login'
import Register from '../src/components/home/register'
import Main from '../src/components/home/main'
import Home from '../src/components/home/home'

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' exact component={Home}/>
        <Route component={Main}/>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'))