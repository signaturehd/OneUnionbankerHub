import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/opticalCardComponent.css'

import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/OpticalPresenter'
import {
  GenericButton,
  GenericInput,
  MultipleFileUploader,
  DatePicker
} from  '../../../ub-components/'

import staticImage from '../../../images/uploadicon-grey.jpg'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

import moment from 'moment'

class OpticalCard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClick,
      attachmentsData,
      amount,
      preferredDate,
      showEditSubmitButton,
      setAttachmentArrayFunc,
      onCheckedSubmissionFunc,
      dateErrorMessage,
      amountErrorMessage,
      orNumberErrorMessage,
      orNumberText,
      onSubmitFunc,
      dateFunc,
      desiredAmount,
      onEditSubmissionFunc,
      oRNumberFunc
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
                errorMessage = { amountErrorMessage }
                placeholder = { 'Enter Amount' }
                onChange = { e => desiredAmount(e.target.value) }
              />
            <br/>
            </div>
            <div>
              <DatePicker
                selected = { preferredDate }
                disabled = { showEditSubmitButton }
                onChange = { (e) => dateFunc(e) }
                maxDate = { moment() }
                readOnly
                text = { 'Date of Official Receipt' }
                errorMessage = { dateErrorMessage }
                />
                <br/>
            </div>
            <div>
              <GenericInput
                value = { orNumberText }
                disabled = { showEditSubmitButton }
                onChange = { (e) => oRNumberFunc(e.target.value) }
                text = { 'Official Receipt Number' }
                errorMessage = { orNumberErrorMessage }
                type = { 'text' }/>
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
    dateErrorMessage : PropTypes.string,
    orNumberErrorMessage : PropTypes.string,
    amountErrorMessage : PropTypes.string,
    orNumberText : PropTypes.string,
    setAttachmentArrayFunc : PropTypes.func,
    onCheckedSubmissionFunc : PropTypes.func,
    oRNumberFunc : PropTypes.func,
    onEditSubmissionFunc : PropTypes.func,
    dateFunc : PropTypes.func,
    preferredDate: PropTypes.string,
    desiredAmount : PropTypes.func,
    onSubmitFunc : PropTypes.func,
    attachmentsData : PropTypes.array,
    amount : PropTypes.string,
    showEditSubmitButton : PropTypes.bool,
  }

  OpticalCard.defaultProps = {
  }
export default OpticalCard
