import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Modal } from '../../../ub-components'

class RemarksModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onClose } = this.props

    return(
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        
      </Modal>
    )
  }
}

RemarksModal.propTypes = {
  onClose : PropTypes.func
}

export Default RemarksModal
