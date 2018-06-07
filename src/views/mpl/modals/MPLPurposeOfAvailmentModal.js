import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class MPLPurposeOfAvailmentModal extends Component {
render () {
  const { onClose, purposeOfAvailment, onSubmit } = this.props

return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }>
    <div>
      <center>
        <h2>
          Purpose of Availment
        </h2>
      </center>
    </div>
    <div>
      {
        purposeOfAvailment && purposeOfAvailment.map((resp, key) =>
        <GenericButton
            key = { key }
            text = { resp && resp.name }
            onClick = { () => onSubmit(resp && resp.name, false) }/>
          )
        }
    </div>
  </Modal>
    )
  }
}
MPLPurposeOfAvailmentModal.propTypes = {
  onClose : PropTypes.func,
  purposeOfAvailment : PropTypes.array,
  onSubmit : PropTypes.func
}

export default MPLPurposeOfAvailmentModal
