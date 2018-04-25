import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../ub-components/'



class FaqModalComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onClose, title, image, description, link, details } = this.props
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

FaqModalComponent.propTypes = {

}

FaqModalComponent.defaultProps = {

}

export default FaqModalComponent
