import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/educationModalStyle.css'

class EducationGrantDependentModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      typeOfGrant : [],
      enabledLoader : false
    }
  }

  showLoader () {
    this.setState({ enabledLoader : true })
  }

  hideLoader () {
    this.setState({ enabledLoader : false })
  }

  onGetClicked (name, amount, attachment) {
    this.props.onSubmit(name, amount, attachment)
    this.props.onClose()
  }

  render () {
    const { onClose, tog } = this.props
    const { enabledLoader } = this.state
    return (
      <Modal
        onClose = { onClose }
        isDismisable = { true }>
        <center>
          <h2>
            Types of Grant
          </h2>
        </center>
        <div>
          {
            enabledLoader ?
             <center>
               <CircularLoader show = { this.state.enabledLoader }/>
             </center> :
            tog.map((resp, key) =>
            <GenericButton
              className = { 'mpl-poa-modal-button' }
              key = { key }
              text = { resp && resp.name }
              onClick = {
                () => this.onGetClicked(resp.name, resp.amount, resp.attachments[0])
              }
              />
            )
          }
        </div>
      </Modal>
    )
  }
}

EducationGrantDependentModal.propTypes = {
    onClose : PropTypes.func,
    tog : PropTypes.array,
    onSubmit : PropTypes.func,
}

export default EducationGrantDependentModal
