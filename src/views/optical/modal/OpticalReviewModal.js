import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'
import BaseMVPView from '../../common/base/BaseMVPView'

import './styles/opticalModal.css'

class OpticalModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showOpticalModal : false,
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
      details,
      onClose,
      fileReceived,
      fileReceived2,
      amount,
      submitForm,
      imagePreviewUrl,
      imagePreviewUrl2,
    } = this.props

    const { disableSubmit, isDismisable } = this.state
    const styles = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      },
      image2 : {
        backgroundImage: `url('${imagePreviewUrl2}')`,
        width : 'auto',
        height : '150px',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      }
    }
    return (
        <Modal
          isDismisable = { isDismisable }
          onClose = { onClose }
        >
            {
              disableSubmit ?
              <center>
                <h3>Please wait while we&#39;re sending your application</h3>
                <br/>
                <br/>
                <CircularLoader show={true}/>
              </center>              :
              <div>
                <h2>Optical Reimbursement Description</h2>
                <br/>
                <h4>Amount : { amount }</h4>
                <br/>
                <div className = { 'optical-image-display' }>
                  <div style = {styles.image1}></div>
                  <div style = {styles.image2}></div>
                </div>
                <br/>
              <div className = { 'optical-modal-action-button' }>
                <GenericButton
                  onClick = { () => {
                    this.setState({ disableSubmit : true, isDismisable: false })
                    submitForm(fileReceived, fileReceived2, amount)
                  }
                }
                  text = { 'confirm' }
                  disabled = {this.state.disabled}
                />
                <GenericButton
                  text = { 'cancel' }
                  onClick = { onClose } />
              </div>
            </div>
          }
        </Modal>
      )
  }
}
OpticalModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  cancel : PropTypes.string,
}
OpticalModal.defaultProps = {
  confirm : 'Agree',
  cancel : 'Disagree',
}
export default OpticalModal
