import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/'

class FaqModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, onClose, arrayListPush} = this.props
    console.log(arrayListPush)
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }>

        <h4>{details && details.title}</h4>
        <span>{details && details.description}</span>
      </Modal>
    )
  }
}

export default FaqModal
