import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/dentalloaComponentStyle.css'
import DentalLoaBranchModal from '../modal/DentalLoaBranchModal'
import DentalLoaDependentModal from '../modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from '../modal/DentalLoaProcedureModal'
import moment from 'moment'
import {
  GenericInput,
  GenericButton,
  DatePicker,
  Card,
  List,
  Line
} from '../../../ub-components'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'

class DentalLoaCard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
      showRecipientModal : false, // Recipient Modal
      showHealthwayBranchModal : false, // Recipient Branch Modal
      showProcedureModal : false, // Recipient Procedure Modal
      datePicker : '',
    }

  }

  render () {
    const {
      text1,
      text2,
      text3,
      text4,
      onClose,
      submit,
      cntinue,
      edit,
      recipient,
      branch,
      onClick,
      submitForm,
      preferredDate,
      selectedProcedures,
      showEditSubmitButton,
      editFormDataFunc,
      recipientErrorMessage,
      healthwayBranchErrorMessage,
      dateErrorMessage,
      errorMessageRequiredProcedure,
      showFormReview,
      dateFunc,
      onSubmitFunc
    } = this.props

    const {
      showRecipientModal,
      showHealthwayBranchModal,
      showProcedureModal } = this.state

    return (
      <div className = { 'dentalloa-container' }>
        <div className = { 'dentalloa-grid-column-2' }>
          <div></div>
          <div>
            <div className = { 'dentalloa-form-card' }>
              <div className = {'dentalloa-body'}>
                <GenericInput
                  onClick = { () => onClick(true, false, false) }
                  onFocus = { () => onClick(true, false, false) }
                  value = { recipient }
                  disabled = { showEditSubmitButton }
                  readOnly
                  text = { text1 }
                  errorMessage = { recipient ? '' : recipientErrorMessage } />
                <GenericInput
                  value = { branch ? branch : '' }
                  disabled = { showEditSubmitButton }
                  readOnly
                  type={ 'text' }
                  onClick = { () => onClick(false, true, false) }
                  onFocus = { () => onClick(false, true, false) }
                  text = { text2 }
                  errorMessage = { branch ? '' : healthwayBranchErrorMessage } />
                <DatePicker
                  readOnly
                  minDate = { moment() }
                  disabled = { showEditSubmitButton }
                  selected = {  preferredDate && moment() }
                  onChange = { (e) => dateFunc(e) }
                  text = { 'Preferred Schedule' }
                  hint = { '(eg. MM/DD/YYYY)' }
                  errorMessage = { preferredDate ? '' : dateErrorMessage }/>
              </div>
            </div>
            <div className = { 'dentalloa-footer-left' }>
            <div className={'procedure-header'}>
            <div className={'grid'}>
              <h4 className={ 'dentalloa-procedure-list-title' }>PROCEDURES</h4>
              <GenericButton
                onClick = { () => onClick(false, false, true) }
                onFocus = { () => onClick(false, false, true) }
                disabled = { showEditSubmitButton }
                type = { 'button' }
                text = { 'Add procedure' }
                className = { 'dentalloa-procedure' }
                value = { 'Procedures' } />
                  <div className = { 'text-error' }>
                      { selectedProcedures.lenght ===0 ? '' : errorMessageRequiredProcedure }
                  </div>
              </div>
            </div>
            {
            selectedProcedures && selectedProcedures.map((procedure, key) => (
                 <div className = { 'dentalloa-procedure-list' }>
                   <div key = { key } className = { 'procedure-grid' }>
                      <div className={ 'procedure-div' }>
                        <h5 className={'dentalloa-procedure-list-name'}>{ procedure.name }</h5>
                        <h6 className={'dentalloa-procedure-list-limit'}>{ `${  procedure.limit}` }</h6>
                      </div>
                      <img
                        src={ require('../../../ub-components/Notify/images/x-circle.png') }
                        className='close-button'
                        onClick={
                          () => {
                            selectedProcedures.splice(key, 1)
                            this.setState({ selectedProcedures })
                          }
                        }
                      />
                   </div>
                   <br/>
                 </div>
                 ))
             }
             <br/>
             <Line/>
             <br/>
             {
               showEditSubmitButton ?
               <div className = { 'dentalloa-form-review' }>
                 <GenericButton
                   type = { 'button' }
                   text = { edit }
                   className = { 'dentalloa-edit-form' }
                   onClick = { () =>
                     editFormDataFunc()
                     }
                   />
                 <GenericButton
                   type = { 'button' }
                   text = { submit }
                   onClick = { () => onSubmitFunc() }
                   className = { 'dentalloa-submit-form-button' }
                   />
               </div>
               :
               <div>
                 <GenericButton
                   type = { 'button' }
                   text = { cntinue }
                   onClick = {
                     () => showFormReview(true)
                   }
                   className = { 'dentalloa-button' } />
               </div>
             }
          </div>
        </div>
      </div>
    </div>
    )
  }
}

DentalLoaCard.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  text1   : PropTypes.string,
  text2   : PropTypes.string,
  text3   : PropTypes.string,
  submit  : PropTypes.string,
  text4   : PropTypes.string,
  preferredDate : PropTypes.string,
  recipientErrorMessage : PropTypes.string,
  healthwayBranchErrorMessage : PropTypes.string,
  dateErrorMessage : PropTypes.string,
  errorMessageRequiredProcedure : PropTypes.string,
  selectedProcedures : PropTypes.array,
  showEditSubmitButton : PropTypes.bool,
  branch : PropTypes.string,
  dateFunc : PropTypes.func,
  editFormDataFunc : PropTypes.func,
  onSubmitFunc : PropTypes.func,
  showFormReview : PropTypes.func,
  submitForm : PropTypes.func,
  onFocus : PropTypes.func,
}

DentalLoaCard.defaultProps = {
  submit  : 'Submit',
  cntinue : 'Continue',
  edit    : 'Edit',
  text1   : 'Recipient',
  text2   : 'Healthway Branch',
  text3   : 'Preferred Schedule',
  text4   : 'PROCEDURE'
}

export default DentalLoaCard
