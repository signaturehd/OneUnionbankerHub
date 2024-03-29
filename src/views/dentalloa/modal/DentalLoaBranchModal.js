import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

import './styles/dentalLoaModalStyle.css'

class DentalLoaBranchModal extends Component {
  constructor (props) {
    super(props)
      this.state = {
        chosenBranch : []
      }
    this.submitData = this.submitData.bind(this)
  }

  /*
    Get Chosen Branch
  */

  submitData (branch, branchName) {
    this.props.chosenBranch(branch, branchName, false)
    this.props.onClose()
  }

  render () {
  const { details, onClose, showHealthwayBranchModal, text, isDismisable } = this.props
  const { chosenBranch } = this.state
  return (
    <Modal
      onClose = { onClose }
      isDismisable = { true }
      chosenBranch = { chosenBranch } >
      <div className = { 'dentalloa-description' }>
        <h2 className = { 'header-default-margin' }>BRANCH</h2>
      </div>
      <div>
        {
          details.map((branch, key) =>
          <GenericButton
            key = { key }
            details = { branch }
            className = { 'dentalloa-modal-option-button' }
            text = { branch.name}
            onClick = { () => this.submitData(branch, branch.name) }/>
          )
        }
      </div>
    </Modal>
    )
  }
}
DentalLoaBranchModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.array,
}
DentalLoaBranchModal.defaultProps = {
}
export default DentalLoaBranchModal
