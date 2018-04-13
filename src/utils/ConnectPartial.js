import React, { Component } from 'react'

export default function ConnectPartial (View, Presenter) {
  class ConnectPartial extends Component {
    constructor () {
      super()
    }

    render () {
      const presenter = new Presenter(this.props.parent.props.container);

      return <View presenter = { presenter } { ...this.props } />
    }
  }

  return ConnectPartial
}
