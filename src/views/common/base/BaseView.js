import React, { Component } from 'react'

import { Loader, Notify } from '../../../ub-components/'

import './styles/base.css'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

class BaseView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loader : false,
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
    const { loader } = this.state
    const { notify } = this.props
    return (
      <div>
        <Loader show = { loader }/>
        <div className = { 'notify-container' }>
        {
          notify &&
          notify.length !== 0 &&
          notify.map((notify, i) => (
            <Notify
              onClick = { () => {
                store.dispatch(NotifyActions.removeNotify(i))
              }}
              key = { i }
              title = { notify.title }
              message = { notify.message }
              type = { notify.type }
            />
          ))
        }
        </div>
      </div>
    )
  }
}

export default BaseView
