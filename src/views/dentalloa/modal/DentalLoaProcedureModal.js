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
        details ?
          details.map((procedure, key ) =>
            procedure.id !== 3 &&
            procedure.id !== 4 &&
            procedure.id !== 5 &&
            procedure.id !== 6 ?
              <GenericButton
                className = { 'dentalloa-modal-option-button' }
                key = { key }
                details = {procedure}
                text = { procedure.name}
                onClick = { () => this.submitData( procedure )}/>
              : <h3>{ procedure.name }</h3>
            )
          :
          <center><h3>Please pick your Receipient</h3></center>
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
