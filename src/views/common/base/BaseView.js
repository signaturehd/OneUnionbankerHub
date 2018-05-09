import React, { Component } from 'react'

import { Loader } from '../../../ub-components/'

class BaseView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loader : false
    }
    this.showLoading = this.showLoading.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
  }

  showLoading (message) {
    this.setState({ loader : true })
  }

  hideLoading () {
    this.setState({ loader : false })
  }

  render () {
    return (
      <div>
        <HorizontalLoader show = { this.state.loader }/>
      </div>
    )
  }
}

export default BaseView
