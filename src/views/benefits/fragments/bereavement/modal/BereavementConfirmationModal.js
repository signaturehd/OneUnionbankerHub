import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton} from '../../../../../ub-components/'

class BereavementConfirmationModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
      onYes,
      onClose
    } = this.props

    const {
       disableSubmit,
       isDismisable
    } = this.state

    return (
      <Modal
        isDismisable = { isDismisable }
        onClose = { onClose }>
        <div>
          <h2>Do you have a death certificate?</h2>
          <br/>
          <center>
            <GenericButton
              onClick = {
                onYes
              }
            
              text = { 'yes' }
              disabled = {this.state.disabled}
            />
            <GenericButton
              onClick = { onClose }
              text = { 'no' } />
          </center>
        </div>
      </Modal>
    )
  }
}


BereavementConfirmationModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  yes : PropTypes.string,
  no : PropTypes.string,
}
BereavementConfirmationModal.defaultProps = {
  yes : 'Agree',
  no : 'Disagree',
}


export default BereavementConfirmationModal
