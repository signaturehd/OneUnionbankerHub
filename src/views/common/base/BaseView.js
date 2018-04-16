import React, { Component } from 'react'

import Loader from '../../../ub-components/Loader'

class BaseView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loader : false
    }
    this.showLoading = this.showLoading.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
  }

  showLoading(message) {
    this.setState({ loader : true })
    console.log(`loading: ${message}`)
  }

  hideLoading() {
    this.setState({ loader : false })
    console.log('hide loading')
  }

  render () {
    return (
      <div>
        <Loader show = { this.state.loader }/>
      </div>
    )
  }

}

export default BaseView
