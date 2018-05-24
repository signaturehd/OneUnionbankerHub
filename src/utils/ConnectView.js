import React, { Component } from 'react'

import Container from '../di/Container'
import AppModule from '../di/AppModule'

export default function ConnectView (View, Presenter) {
  class ConnectView extends Component {
    constructor () {
      super()
    }

    render () {
      const presenter = new Presenter(AppModule(new Container()))

      return <View presenter = { presenter } { ...this.props } />
    }
  }

  return ConnectView
}
