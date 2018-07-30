import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/opticalCardComponent.css'
import Button from './OpticalButton'

import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/OpticalPresenter'
import { GenericInput, MultipleFileUploader } from  '../../../ub-components/'

import staticImage from '../../../images/uploadicon-grey.jpg'
import store from '../../../store'
import { NotifyActions } from '../../../actions'



class OpticalCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      file2: null,
      imagePreviewUrl: null,
      imagePreviewUrl2: null,
      warning: null,
      amount : 0
    }
  }

  render () {
    const {
      proceedModal,
      props,
      fileReceived,
      fileReceived2,
      onClick,
      attachmentsData,
      showEditSubmitButton
    } = this.props

    const {
      confirm,
      cancel,
      warning,
      amount,
      file2,
      file,
      imagePreviewUrl,
      imagePreviewUrl2,
      acceptNumber,
    } = this.state

    return (
        <div className = { 'optical-card' } >
          <div>
            <div className = {'optical-header'} >
              <div className = { 'optical-amount-field' }>
                <GenericInput
                  text = { 'Amount' }
                  value = { amount }
                  placeholder = { 'Enter Amount' }
                  maxLength = { 4 }
                  onChange = { e => this.setState({ amount: parseInt(e.target.value, 10) || 0 }) }
                />
              <br/>
              </div>
              <div className = {'optical-body'}>
                <br/>
                  {
                    attachmentsData.length !== 0  ?
                      <MultipleFileUploader
                        placeholder = { 'Form Attachments' }
                        fileArray = { attachmentsData }
                        setFile = { (resp) => setAttachmentArrayFunc(resp) }
                        disabled = { showEditSubmitButton }
                        errorMessage = { 'Please include required attachment' }
                      />
                    :
                    <div></div>
                  }
              </div>
              <div className = { 'optical-button-submit' }>
                <Button onClick = { () => onClick(
                  true, file, file2, amount, imagePreviewUrl, imagePreviewUrl2)}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  OpticalCard.propTypes = {
    onClose : PropTypes.func,
    details : PropTypes.func,
    attachmentsData : PropTypes.array,
    confirm : PropTypes.string,
    cancel : PropTypes.string,
    warning : PropTypes.string,
    showEditSubmitButton : PropTypes.bool,
  }

  OpticalCard.defaultProps = {
    confirm : 'Submit',
    cancel : 'Cancel',
    warning : '',

  }
export default OpticalCard
