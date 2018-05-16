import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'
import Button from '../components/OpticalButton'
import BaseMVPView from '../../common/base/BaseMVPView'

import './styles/optical-modal.css'

class OpticalModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showOpticalModal : false,
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
    const {disabled} = this.state
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
          isDismisable = { true }
          onClose = { onClose }
        >
            <h2>Optical Reimbursement Description</h2>
            <br/>
            <h4>Amount : { amount }</h4>
            <br/>
            <div className = { 'optical-image-display' }>
              <div style = {styles.image1}></div>
              <div style = {styles.image2}></div>
            </div>
            <br/>
            <GenericButton
              onClick = { () => {
                this.setState({disabled : true})
                submitForm(fileReceived, fileReceived2, amount)} }
              text = { 'confirm' }
              disabled = {this.state.disabled}
            />
            <GenericButton text = { 'cancel' } onClick = { onClose } />
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
