import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import LoginView from './login/LoginView'
import NavigationView from './navigation/NavigationView'
import ResetPasswordView from './reset/ResetPasswordFragment'

import Presenter from './AppPresenter'

import ConnectView from '../utils/ConnectView'
import BaseMVPView from './common/base/BaseMVPView'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { EventActions } from '../actions'

/* Mobile Charts */
import PensionFundsChartComponent from './pensionfunds/components/PensionFundsChartComponent'

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

  componentDidMount () {
    console.log('%cWarning!', 'color: red; font-size: 40px; font-weight: bold;')
    console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a 1Uhub feature or "hack" someone account it is a scam and will give them access to your 1Uhub account!', 'color: #ff8a00; font-size: 18px; font-weight: bold;')
  }

  componentWillReceiveProps (nextProps) {
    this.presenter.checkLogin()
  }

  componentWillMount () {
    this.presenter.checkLogin()
  }

  componentDidCatch (error, info) {
    console.log(info, error)
  }

  isLogin (isLogin) {
    this.setState({ isLogin })
  }

  render () {

    return (
      <div>
        <Switch>
          <Route
            path = '/success/:token'
            render = { props => <ResetPasswordView { ...props }/> }/>
          <Route path = '/' render={props => {
            if (this.state.isLogin) {
              return <NavigationView  { ...props } />
            }
            return (<LoginView { ...props } />)
          }} />

      </Switch>
      </div>
    )
  }
}

export default withRouter(ConnectView(connect(mapStateToProps)(App), Presenter))
