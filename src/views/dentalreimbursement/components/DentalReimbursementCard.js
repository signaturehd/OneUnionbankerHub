import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/dentalReimbursementComponentStyle.css'

import DentalReimbursementProcedureModal from
  '../modal/DentalReimbursementProcedureModal'

import {
  GenericInput,
  DatePicker,
  Card,
  GenericButton,
  FileUploader,
  Checkbox,
  GenericTextBox,
  List,
  MultipleFileUploader,
 } from '../../../ub-components/'

 import store from '../../../store'
 import { NotifyActions } from '../../../actions'

 import { RequiredValidation, Validator, MoneyValidation } from '../../../utils/validate'
import moment from 'moment'

class DentalReimbursementCard extends Component {
  constructor (props) {
  super(props)
  this.state = {
    procedureModal : false, // display procedure modal
    dependents: [],
    selectedDependent: null, // selected dependent
    selectedProcedures: [], // selected procedure
    procedureModal: false,
    reviewModal: false,
    submit: '',
    procedure: '',
    showReviewSubmissionModal : false,
    fileAttachments : [],
    officialReceiptDate : null,
    officialReceiptNumber : '',
    attachmentArray : [],
    showEditMode: false
  }
  this.submission = this.submission.bind(this)
  this.validator = this.validator.bind(this)
}

validator (input) {
  return new RequiredValidation().isValid(input)
}

/*
  Form Submission
*/
submission (e) {
  const {
    selectedDependent,
    selectedProcedures,
    officialReceiptDate,
    officialReceiptNumber,
    attachmentArray,
  } = this.state

  let validateAttachments = false
  attachmentArray && attachmentArray.map(
    (attachment, key) => {
      if(!attachment.file) {
        validateAttachments = true
      }
    }
  )

  if (!this.validator(officialReceiptDate)) {
    store.dispatch(NotifyActions.addNotify({
       title : 'Warning' ,
       message : 'Official Receipt Date is required',
       type : 'warning',
       duration : 2000
     })
   )
 } else if (!this.validator(officialReceiptNumber)) {
    store.dispatch(NotifyActions.addNotify({
       title : 'Warning' ,
       message : 'Official Receipt Number is required',
       type : 'warning',
       duration : 2000
     })
   )
 } else if (!attachmentArray.length) {
    store.dispatch(NotifyActions.addNotify({
       title : 'Warning' ,
       message : 'Attachments is required',
       type : 'warning',
       duration : 2000
     })
   )
 } else if (validateAttachments) {
   attachmentArray && attachmentArray.map(
     (attachment, key) => {
       if(!attachment.file) {
         store.dispatch(NotifyActions.addNotify({
            title : 'Warning' ,
            message : attachment.name + ' is required',
            type : 'warning',
            duration : 2000
          })
        )
       }
     }
   )
  } else if (!this.validator(selectedDependent)) {
   store.dispatch(NotifyActions.addNotify({
      title : 'Warning' ,
      message : 'Please select dependents',
      type : 'warning',
      duration : 2000
    })
  )
} else if (selectedProcedures.length === 0) {
  store.dispatch(NotifyActions.addNotify({
     title : 'Warning' ,
     message : 'Please select procedures',
     type : 'warning',
     duration : 2000
   })
 )
} else if (selectedProcedures.length !== 0) {
    let validate
    let checknull
    selectedProcedures.map((procedure, key) => {
      validate = procedure.amount > procedure.limit || procedure.amount === 0
      checknull = !procedure.amount

      if (validate || checknull) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Dental Reimbursement',
            message : `Please check the amount for procedure  ${procedure.name}. It should not be zero, empty or more than the set limit`,
            type : 'warning',
            duration : 2000
          })
        )
      } else {
        this.setState({ showEditMode : true })
      }
    })
  } else {
    this.setState({ showEditMode : true })
  }
}

render () {
  const {
    details,
    fileReceived,
    fileReceived2,
    onClick,
    dependents,
    onFocus,
    attachments
  } = this.props

  const {
    reviewModal,
    selectedDependent,
    selectedProcedures,
    procedureModal,
    procedure,
    showResults,
    showReviewSubmissionModal,
    officialReceiptDate,
    officialReceiptNumber,
    attachmentArray,
    showEditMode
  } = this.state

  return (
    <div className = { 'dentalreimbursement-container' }>
      <div className = { 'dentailreimbursement-grid-x3' }>
        <div></div>
          <Card className = { 'dentalreimbursement-card' }>
            <div>
              <DatePicker
                maxDate = { moment() }
                disabled = { false }
                selected = { officialReceiptDate }
                onChange = { (e) => this.setState({ officialReceiptDate : e }) }
                text = { 'Date of Official Receipt' }
                readOnly
                hint = { '(eg. MM/DD/YYYY)' }/>
              <GenericInput
                value = { officialReceiptNumber }
                onChange = { (e) => this.setState({ officialReceiptNumber : e.target.value }) }
                disabled = { false }
                maxLength = { 20 }
                text = { 'Official Receipt Number' } />
              <MultipleFileUploader
                placeholder = 'Form Attachments'
                fileArray = { attachments }
                setFile = { (resp) => this.setState({ attachmentArray : resp }) }
             />
            </div>
            <div className = {'dentalreimbursement-footer-left'}>
              {
                procedureModal &&
                <DentalReimbursementProcedureModal
                  onSubmit = { procedure => {
                  const updatedProcedures = [...selectedProcedures]
                  updatedProcedures.push(procedure)

                  this.setState({ selectedProcedures: updatedProcedures })
                }}
                  selectedProcedure = { selectedProcedures }
                  procedures = { selectedDependent ? selectedDependent.procedures : [] }
                  onClose = { () => this.setState({ procedureModal : false }) } />
                }

               <h2 className = { 'dentalreimbursement-header-chooseDependents' }>
                 CHOOSE RECIPIENT
               </h2>
               {
                 dependents && dependents.map((dependent, key) => {
                   const selectedDependentId = selectedDependent && selectedDependent.id
                   return (
                     <Checkbox
                      label={ dependent.name }
                      key={ key }
                      value={ dependent.id }
                      checked={ dependent.id === selectedDependentId }
                      onChange={ e => this.setState({ selectedDependent: dependent }) } />
                   )
                 })
               }
             <GenericButton
               onClick={ () => this.setState({ procedureModal: true }) }
               onFocus={ () => this.setState({ procedureModal: true }) }
               className = {'dentalreimbursement-procedure' }
               text = { 'Open Procedures' } />
            </div>
          <br/>
          <br/>
         {
           selectedProcedures && selectedProcedures.map((procedure, key) => (
              <div key={ key } className = { 'dentalreimbursement-selected-procedure' }>
                <div className = {'input-grid'}>
                  <GenericTextBox
                    value = { procedure.amount }
                    onChange = { e => {
                      const updatedProcedures = [...selectedProcedures]
                      updatedProcedures[key].amount = parseInt(e.target.value) || 0
                      this.setState({ selectedProcedures: updatedProcedures })
                      }
                    }
                    maxLength = { procedure.limit.toString().length }
                    placeholder = { `${procedure.name} (${procedure.limit})` }
                   />
                  <div className = { 'dentalreimbursement-button-close' }>
                    <img
                      src = { require('../../../images/x-circle-global.png') }
                      onClick = { () => {
                        const { selectedProcedures } = this.state
                        selectedProcedures.splice(key, 1)
                        this.setState({ selectedProcedures })
                      }}
                    />
                  </div>
                </div>
                <br/>
              </div>
              )
            )
          }
          {
            showEditMode ?
            <div className = { 'grid-global' }>
              <GenericButton
                onClick = { () => this.setState({ showEditMode : false }) }
                text = { 'Edit' }
                />
              <GenericButton
                onClick = { () => this.props.presenter.addDentalReimbursement(
                      officialReceiptDate, officialReceiptNumber, selectedDependent.id, selectedProcedures, attachmentArray
                    ) }
                text = { 'Submit' }
                />
            </div>
            :
            <GenericButton
             onClick = { this.submission }
             className = { 'dentalr-continue-button' }
             text = { 'Continue' }/>
          }

          </Card>
        <div></div>
      </div>
    </div>
    )
  }
}
DentalReimbursementCard.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  onFocus : PropTypes.func,
  procedure : PropTypes.string,
  dependents: PropTypes.array,

}
DentalReimbursementCard.defaultProps = {
  procedure : 'PROCEDURE',
  text: 'procedure'
}

export default DentalReimbursementCard
