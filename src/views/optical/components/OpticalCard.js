import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/opticalCardComponent.css'

import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/OpticalPresenter'
import {
  GenericButton,
  GenericInput,
  MultipleFileUploader
} from  '../../../ub-components/'

import staticImage from '../../../images/uploadicon-grey.jpg'
import store from '../../../store'
import { NotifyActions } from '../../../actions'


class OpticalCard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClick,
      attachmentsData,
      amount,
      showEditSubmitButton,
      setAttachmentArrayFunc,
      onCheckedSubmissionFunc,
      onSubmitFunc,
      desiredAmount,
      onEditSubmissionFunc
    } = this.props

    return (
      <div className = { 'optical-card' } >
        <div>
          <div className = {'optical-header'} >
            <div>
              <GenericInput
                text = { 'Amount' }
                value = { amount }
                disabled = { showEditSubmitButton }
                placeholder = { 'Enter Amount' }
                maxLength = { 4 }
                onChange = { e => desiredAmount(e.target.value) || 0 }
              />
            <br/>
            </div>
            <div>
              <GenericInput
                text = { 'Date of Official Receipt' }
                value = { orDate }
                disabled = { showEditSubmitButton }
                placeholder = { 'Enter Amount' }
                maxLength = { 4 }
                onChange = { e => desiredAmount(e.target.value) || 0 }
              />
            <br/>
            </div>
            <div className = { 'optical-body' }>
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
            <div>
              {
                !showEditSubmitButton ?

                <GenericButton
                  text = { 'Continue' }
                  className = { 'optical-button' }
                  onClick = { () => onCheckedSubmissionFunc(true) }
                />
                :
                <div className = { 'optical-grid-button-container' }>
                  <GenericButton
                    text = { 'Edit' }
                    className = { 'optical-button' }
                    onClick = { () => onEditSubmissionFunc(true) }
                    />
                  <GenericButton
                    text = { 'Submit' }
                    className = { 'optical-button' }
                    onClick = { () => onSubmitFunc() }
                    />
                </div>
              }
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
    setAttachmentArrayFunc : PropTypes.func,
    onCheckedSubmissionFunc : PropTypes.func,
    onEditSubmissionFunc : PropTypes.func,
    desiredAmount : PropTypes.func,
    onSubmitFunc : PropTypes.func,
    attachmentsData : PropTypes.array,
    amount : PropTypes.string,
    showEditSubmitButton : PropTypes.bool,
  }

  OpticalCard.defaultProps = {
  }
export default OpticalCard
