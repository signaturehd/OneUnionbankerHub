import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'
import './styles/medicalSchedulingModalStyle.css'

export default class MedicalSchedulingClinicModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      enabledLoader : false
    }
  }

  render () {
    const { enabledLoader } = this.setState
    const {
      clinics,
      onSubmit,
      onClose
    } = this.props

    return (
      <Modal
        onClose = { onClose }
        isDismisable = { true }>
        <center>
          <h2>
            Clinics
          </h2>
        </center>
        <div>
          {
            enabledLoader ?
             <center>
               <CircularLoader show = { enabledLoader }/>
             </center> :
            clinics.map((clinic, key) =>
            <GenericButton
              className = { 'medsched-modal-button' }
              key = { key }
              text = { clinic }
              onClick = {
                () => {
                  onSubmit(clinic)
                  onClose()
                }
              }
              />
            )
          }
        </div>
      </Modal>
    )
  }
}

MedicalSchedulingClinicModal.propTypes = {
    clinics : PropTypes.array,
    onClose : PropTypes.func,
    onSubmit : PropTypes.func,
}
