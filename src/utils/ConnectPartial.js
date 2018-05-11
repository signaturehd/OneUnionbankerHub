import React, { Component } from 'react'
import Container from '../di/Container'
import AppModule from '../di/AppModule'

export default function ConnectPartial (View, Presenter) {
  class ConnectPartial extends Component {
    constructor () {
      super()
    }

    render () {
<<<<<<< HEAD
      const presenter = new Presenter(this.props.parent.props.container);
=======
      const presenter = new Presenter(AppModule(new Container()))
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2

      return <View presenter = { presenter } { ...this.props } />
    }
  }

  return ConnectPartial
}
