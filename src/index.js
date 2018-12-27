import React from 'react'
import ReactDOM from 'react-dom'
/* redux */
import { Provider } from 'react-redux'

/* Routers */
import { HashRouter, Route, browserHistory } from 'react-router-dom'

/* Routes */
import App from './views/App'
import { main } from './css'

import store from './store'

import Container from './di/Container'
import AppModule from './di/AppModule'

/* Mobile View */
import MobileView from './views/mobileplatform/MobileView'


ReactDOM.render(
  <Provider store={ store }>
    <HashRouter basename = { '/' }>
      <MobileView />
    </HashRouter>
  </Provider>, document.getElementById('root'))
