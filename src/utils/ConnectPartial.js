import React, { Component } from 'react'
import Container from '../di/Container'
import AppModule from '../di/AppModule'

export default function ConnectPartial (View, Presenter) {
  class ConnectPartial extends Component {
    constructor () {
      super()
    }

    render () {
      const presenter = new Presenter(AppModule(new Container()))

      return <View presenter = { presenter } { ...this.props } />
    }
  }

  return ConnectPartial
}
