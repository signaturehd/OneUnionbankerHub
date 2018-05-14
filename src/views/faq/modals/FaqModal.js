import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../../ub-components/'

class FaqModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, onClose } = this.props
    return (
      <Modal
        onClose = { onClose }
      >
        <h4>{details.title}</h4>
        <span>{details.description}</span>
      </Modal>
    )
  }
}
// TODO
/* Fetch datas on Click display details */
/* Close modal set elements to null */

export default FaqModal
