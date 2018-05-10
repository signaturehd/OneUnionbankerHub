import React, { Component } from 'react'

import { Loader, Notify } from '../../../ub-components/'

class BaseView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loader : false,
      showNotif : false,
      title : null,
      message : null,
      type : null,
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

  showNotify (title, message, type) {
    this.setState({ showNotif : true, title, message, type })
  }


  render () {

    const { loader, showNotif, title, message, type } = this.state

    return (
      <div>
        <Loader show = { loader }/>
        {
          showNotif &&
          <Notify
            title = { title }
            message = { message }
            type = { type }
            onClose = { () => this.setState({ showNotif : false }) }
          />
        }
      </div>
    )
  }
}

export default BaseView
