import React from 'react'
import ReactDOM from 'react-dom'
/* redux */
import { Provider } from 'react-redux'

/* Routers */
import { HashRouter, Switch, Route, browserHistory } from 'react-router-dom'

/* Routes */
import App from './views/App'
import { main } from './css'

import store from './store'

import Container from './di/Container'
import AppModule from './di/AppModule'

/* Mobile View */
import MobileView from './views/mobileplatform/MobileView'

let platformChecker
let platformUsed
const userAgentTest = window.navigator.userAgent

if(userAgentTest.toLowerCase().indexOf('android') !== -1) {
  platformUsed = 'android'
  platformChecker = true
} else if (userAgentTest.toLowerCase().indexOf('iphone') !== -1) {
  platformUsed = 'ios'
  platformChecker = true
} else if (userAgentTest.toLowerCase().indexOf('ipad') !== -1) {
  platformUsed = 'ios'
  platformChecker = true
} else if (userAgentTest.toLowerCase().indexOf('playbook') !== -1) {
  platformUsed = 'ios'
  platformChecker = true
} else {
  platformChecker = false
}

ReactDOM.render(
  <Provider store={ store }>
    <HashRouter basename = { '/' }>
      <App />
    </HashRouter>
  </Provider>, document.getElementById('root')
)
