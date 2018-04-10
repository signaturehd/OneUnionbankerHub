import React from 'react'
import ReactDOM from 'react-dom'
import LibraryView from './views/library/LibraryView'

/* redux */
import { Provider } from 'react-redux'

/* Routers */
import { BrowserRouter, Route, browserHistory } from 'react-router-dom'

/* Routes */
import App from './views/App'
import { main } from './css'

import store from './store'

import Container from './di/Container'
import AppModule from './di/AppModule'


ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter history={ browserHistory }>
      <App container={ AppModule(new Container()) } />
    </BrowserRouter>
  </Provider>, document.getElementById('root'))

