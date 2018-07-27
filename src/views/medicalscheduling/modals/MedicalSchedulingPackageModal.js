import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'
import './styles/medicalSchedulingModalStyle.css'

export default class MedicalSchedulingPackageModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      enabledLoader : false
    }
  }

  render () {
    const { enabledLoader } = this.setState
    const {
      packages,
      onSubmit,
      onClose
    } = this.props

    return (
      <Modal
        onClose = { onClose }
        isDismisable = { true }>
        <center>
          <h2>
            Packages
          </h2>
        </center>
        <div>
          {
            enabledLoader ?
             <center>
               <CircularLoader show = { enabledLoader }/>
             </center> :
            packages.map((resp, key) =>
            <GenericButton
              className = { 'medsched-modal-button' }
              key = { key }
              text = { resp }
              onClick = {
                () => {
                  onSubmit(resp)
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

MedicalSchedulingPackageModal.propTypes = {
    packages : PropTypes.array,
    onClose : PropTypes.func,
    onSubmit : PropTypes.func,
}
