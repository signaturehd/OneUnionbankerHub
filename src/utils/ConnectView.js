import React, { Component } from 'react'

export default function ConnectView (View, Presenter) {
  class ConnectView extends Component {
    constructor () {
      super()
    }

    render () {
      const presenter = new Presenter(this.props.container)
      return <View presenter = { presenter } { ...this.props } />
    }
  }

  return ConnectView
}
