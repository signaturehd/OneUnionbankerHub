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
  Checkbox,
  List,
  Line,
  MultipleFileUploader,
 } from '../../../ub-components/'

 import store from '../../../store'
 import { NotifyActions } from '../../../actions'

 import { RequiredValidation, Validator, MoneyValidation } from '../../../utils/validate'
 import moment from 'moment'
 import { format } from '../../../utils/numberUtils.js'

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
  } = this.state
  const { attachments } = this.props

  let validateAttachments = false
  attachments && attachments.map(
    (attachment, key) => {
      if(!attachment.file) {
        validateAttachments = true
      }
    }
  )
  store.dispatch(NotifyActions.resetNotify())
  if (!this.validator(officialReceiptDate)) {
    store.dispatch(NotifyActions.addNotify({
       title : 'My Benefits' ,
       message : 'Official Receipt Date is required',
       type : 'warning',
       duration : 2000
     })
   )
 } else if (!this.validator(officialReceiptNumber)) {
    store.dispatch(NotifyActions.addNotify({
       title : 'My Benefits' ,
       message : 'Official Receipt Number is required',
       type : 'warning',
       duration : 2000
     })
   )
 } else if (!attachments.length) {
    store.dispatch(NotifyActions.addNotify({
       title : 'My Benefits' ,
       message : 'Attachments is required',
       type : 'warning',
       duration : 2000
     })
   )
 } else if (validateAttachments) {
   attachments && attachments.map(
     (attachment, key) => {
       if(!attachment.file) {
         store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits' ,
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
      title : 'My Benefits' ,
      message : 'Please select dependents',
      type : 'warning',
      duration : 2000
    })
  )
} else if (selectedProcedures.length === 0) {
  store.dispatch(NotifyActions.addNotify({
     title : 'My Benefits' ,
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
            message : `Please check the amount for procedure  ${procedure.name}. It should not be zero, empty or more than the set limit of Php ${ procedure.limit }`,
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
    attachments,
    setFileNewFunc
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
    showEditMode
  } = this.state

  return (
    <div className = { 'dentalreimbursement-container' }>
      <div className = { 'dentailreimbursement-grid-x3' }>
        <div></div>
          <div className = { 'dentalreimbursement-card' }>
            <div>
              <DatePicker
                maxDate = { moment() }
                disabled = { showEditMode }
                selected = { officialReceiptDate }
                onChange = { (e) => this.setState({ officialReceiptDate : e }) }
                text = { 'Date of Official Receipt' }
                readOnly
                hint = { '(eg. MM/DD/YYYY)' }/>
              <GenericInput
                value = { officialReceiptNumber }
                onChange = { (e) => this.setState({ officialReceiptNumber : e.target.value }) }
                disabled = { showEditMode }
                maxLength = { 20 }
                text = { 'Official Receipt Number' } />
              <MultipleFileUploader
                placeholder = 'Form Attachments'
                fileArray = { attachments }
                disabled = { showEditMode }
                setFile = { (attachmentArray) => setFileNewFunc(attachmentArray) }
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
                      disabled = { showEditMode }
                      key={ key }
                      value={ dependent.id }
                      checked={ dependent.id === selectedDependentId }
                      onChange={ e => this.setState({ selectedDependent: dependent }) } />
                   )
                 })
               }
             <GenericButton
               disabled = { showEditMode }
               onClick={ () => this.setState({ procedureModal: true }) }
               onFocus={ () => this.setState({ procedureModal: true }) }
               className = {'dentalreimbursement-procedure' }
               text = { 'Open Procedures' } />
            </div>
          <br/>
          <br/>
         {
           selectedProcedures && selectedProcedures.map((procedure, key) => (
              <div key={ key } className = { 'dentalreimbursement-grid-procedure' }>
                <GenericInput
                  disabled = { showEditMode }
                  text = { procedure.name + ' (Php ' + `${ format(procedure.limit) })` }
                  onChange = { (e) => {
                    const updatedProcedures = [...selectedProcedures]
                    updatedProcedures[key].amount = parseInt(e.target.value) || 0
                    this.setState({ selectedProcedures: updatedProcedures })
                    }
                  }
                  maxLength = { procedure.limit.toString().length }
                  placeholder = { `${procedure.name} (${procedure.limit})` }
                 />
               <div>
                 {
                   !showEditMode &&
                   <img
                     src = { require('../../../images/x-circle-global.png') }
                     onClick = { () => {
                       const { selectedProcedures } = this.state
                       selectedProcedures.splice(key, 1)
                       this.setState({ selectedProcedures })
                     }}
                   />
                 }
               </div>
              </div>
              )
            )
          }
          <br/>
          <Line/>
          {
            showEditMode &&
            <center>
              <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
            </center>
          }
          <br/>
          {
            showEditMode ?
            <div className = { 'grid-global' }>
              <GenericButton
                onClick = { () => this.setState({ showEditMode : false }) }
                text = { 'Edit' }
                />
              <GenericButton
                onClick = { () => this.props.presenter.addDentalReimbursement(
                      officialReceiptDate, officialReceiptNumber, selectedDependent.id, selectedProcedures, attachments
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

        </div>
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
  setFileNewFunc : PropTypes.func,
  procedure : PropTypes.string,
  dependents: PropTypes.array,

}
DentalReimbursementCard.defaultProps = {
  procedure : 'PROCEDURE',
  text: 'procedure'
}

export default DentalReimbursementCard
