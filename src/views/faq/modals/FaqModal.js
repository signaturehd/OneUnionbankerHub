import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, CircularLoader } from '../../../ub-components/'

class FaqModal extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { details, onClose, title } = this.props
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }>
        {
          details ?
            <div>
              <h4>{ title }</h4>
              <div dangerouslySetInnerHTML = {{__html: details }}/>
            </div>
          :
            <center>
              <h3>Please wait...</h3>
              <CircularLoader show = { true } />
            </center>
        }
      </Modal>
    )
  }
}

FaqModal.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  onClose: PropTypes.func,
}

export default FaqModal
