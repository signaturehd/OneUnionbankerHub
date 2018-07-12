import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton} from '../../../ub-components/'

import './styles/modalStyle.css'

class BereavementConfirmationModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      disableSubmit : false,
      isDismisable : true,
      showMessageRequiredCertificate : false,
      showCheckIfCertificateIsAvailable : true
    }
    this.navigate=this.navigate.bind(this)
  }

  navigate () {
    this.props.onClose()
    this.props.navigateCall()
  }

  render () {
    const {
      onYes,
      onClose,
      navigateCall
    } = this.props

    const {
       disableSubmit,
       isDismisable,
       showMessageRequiredCertificate,
       showCheckIfCertificateIsAvailable
    } = this.state

    return (
      <div>
        {
          showCheckIfCertificateIsAvailable &&
          <Modal
            onClose = { onClose }>
            <div>
              <center>
                <h2>Is the death certificate available?</h2>
                <br/>
                <p>We&#39;re sorry to hear about your loss. Please accept our sympathies. We&#39;d like to help you on this time of need. Has the Death certificate been prepared?
                </p>
              </center>
              <div className = { 'confirmation-grid-action' } >
                <GenericButton
                  onClick = { () =>
                    this.setState({
                      showMessageRequiredCertificate : true,
                      showCheckIfCertificateIsAvailable : false })
                }
                  text = { 'no' } />
                <GenericButton
                  onClick = { onYes }
                  text = { 'yes' }
                  disabled = {this.state.disabled}
                />
              </div>
            </div>
          </Modal>
        }
        {
          showMessageRequiredCertificate &&
          <Modal onClose={ ()=>
              this.setState({ showMessageRequiredCertificate : false }) }>
              <center>
                <h2>Please prepare the death certificate first before proceeding.</h2>
                <br/>
                <GenericButton
                  onClick={ () => this.navigate() }
                  text={ 'OK' }
                />
              </center>
          </Modal>
        }
      </div>
    )
  }
}


BereavementConfirmationModal.propTypes = {
  onClose : PropTypes.func,
  details : PropTypes.func,
  navigateCall : PropTypes.func,
  yes : PropTypes.string,
  no : PropTypes.string,
}
BereavementConfirmationModal.defaultProps = {
  yes : 'Agree',
  no : 'Disagree',
}


export default BereavementConfirmationModal
