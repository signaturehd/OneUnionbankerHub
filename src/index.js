import React from 'react'
import ReactDOM from 'react-dom'

/* redux */
import { Provider } from 'react-redux'

/* Routers */
import { Router, Route, browserHistory } from 'react-router'

/* Routes */
import views from './views'
import { main, } from './css'

import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router history={ browserHistory }>
      { views() }
    </Router>
  </Provider>, document.getElementById('root'))
