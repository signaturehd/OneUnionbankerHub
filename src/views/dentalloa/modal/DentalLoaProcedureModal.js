import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton} from '../../../ub-components/'

class DentalLoaProcedureModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
    chosenProcedure : []
  }
this.submitData = this.submitData.bind(this)
}
submitData ( value ) {
  this.setState({ chosenProcedure : value })
  console.log(value)
}
render () {
  const { details, onClose, showProcedureModal, text, isDismisable } = this.props
  console.log(this.props)
return (
  <Modal
    onClose = { onClose }
    isDismisable = { true }
  >
    <div className = { 'optical-description' }>
      <h2>Procedures</h2>
    </div>
    <div className = { 'optical-modal-footer' }>
      {
        details.map((procedure, key ) =>
        <GenericButton
            className = { 'dentalloa-modal-option-button' }
            key = { key }
            details = {procedure}
            text = { procedure.name}
            onClick = { () => this.submitData( procedure )}/>
          )
        }
      </div>
    </Modal>
    )
  }
}
DentalLoaProcedureModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.array,
}
DentalLoaProcedureModal.defaultProps = {
}
export default DentalLoaProcedureModal
