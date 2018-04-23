import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import LoginView from './login/LoginView'
import DrawerView from './drawer/DrawerView'
import Presenter from './AppPresenter'

import ConnectView from '../utils/ConnectView'
import BaseMVPView from './common/base/BaseMVPView'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { EventActions } from '../actions'

const mapStateToProps = state => ({
  events: state.events,
})

class App extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      isLogin: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    this.presenter.checkLogin()
  }

  componentWillMount () {
    this.presenter.checkLogin()
  }

  isLogin (isLogin) {
    this.setState({ isLogin })
  }

  render () {
    return (
      <div>
        <Switch>
          <Route path = '/' render={props => {
            if (this.state.isLogin) {
              return <DrawerView container = { this.props.container } { ...props } />
            }
              return <LoginView container = { this.props.container } { ...props } />
          }} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(ConnectView(connect(mapStateToProps)(App), Presenter))
