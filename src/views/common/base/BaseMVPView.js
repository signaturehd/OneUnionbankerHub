import React, { Component } from 'react'

import BaseView from './BaseView'

class BaseMVPView extends BaseView {
  constructor (props) {
    super(props)

    this.presenter = props.presenter
    this.presenter.setView(this)
  }
}

export default BaseMVPView
