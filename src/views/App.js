import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginView from './login/LoginView'
import DrawerView from './drawer/DrawerView'

import Presenter from './AppPresenter'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { EventActions } from '../actions'

const mapStateToProps = state => ({
  events: state.events,
});

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLogin: false,
    };

    this.presenter = new Presenter(this.props.container);
    this.presenter.setView(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.events.token) {
      this.setState({ isLogin: true })
    } else {
      this.setState({ isLogin: false })
    }
  }

  componentWillMount () {
    this.presenter.checkLogin()
  }

  isLogin (isLogin) {
    this.setState({ isLogin })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path = '/' render={(props) => {
            if (this.state.isLogin) {
              return <DrawerView container = { this.props.container } />
            } else {
              return <LoginView container = { this.props.container } />
            }
          }} />
        </Switch>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
