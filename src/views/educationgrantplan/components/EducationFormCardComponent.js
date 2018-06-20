import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import './styles/educationComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import DatePicker from 'react-datepicker'
import moment from 'moment'

class EducationFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      dependentsText: '',
      companyText: '',
      dopPayment: '',
      effectiveDate: '',
      maturityDate: '',
      typeOfGrant: '',
      grantAmount: ''
    }
  }

  render () {

    const {
      dependentsText,
      companyText,
      dopPayment,
      effectiveDate,
      maturityDate,
      typeOfGrant,
      grantAmount
    } = this.state

    return (
      <div className = {'educ-container'}>
        <div className = { 'educ-grid-column-2' }>
          <div></div>
          <Card className = { 'educ-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = {'educ-form-card-body '}>
              <GenericTextBox
                value = { dependentsText }
                onChange = { (e) => { this.setState({dependentsText: e.target.value}) } }
                placeholder = { 'Dependents' }
                type = { 'text' }/>
              <GenericTextBox
                value = { companyText }
                onChange = { (e) => { this.setState({companyText: e.target.value}) } }
                placeholder = { 'Company' }
                type = { 'text' }/>
              <GenericTextBox
                value = { dopPayment }
                onChange = { (e) => { this.setState({dopPayment: e.target.value}) } }
                placeholder = { 'Duration of Premium Payment' }
                type = { 'text' }/>
              <GenericTextBox
                value = { effectiveDate }
                onChange = { (e) => { this.setState({effectiveDate: e.target.value}) } }
                placeholder = { 'Effectivity Date/Coverage Insurance' }
                type = { 'text' }/>
              <GenericTextBox
                value = { maturityDate }
                onChange = { (e) => { this.setState({maturityDate: e.target.value}) } }
                placeholder = { 'Maturity Date' }
                type = { 'text' }/>
              <GenericTextBox
                value = { typeOfGrant }
                onChange = { (e) => { this.setState({typeOfGrant: e.target.value}) } }
                placeholder = { 'Type of Grant' }
                type = { 'text' }/>
              <GenericTextBox
                value = { grantAmount }
                onChange = { (e) => { this.setState({grantAmount: e.target.value}) } }
                placeholder = { 'Grant Amount' }
                type = { 'text' }/>
              <br/>
              <FileUploader
                accept="image/gif,image/jpeg,image/jpg,image/png,"
                placeholder = 'Form Attachments'/>
              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = { () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId) }
                className = { 'educ-submit' } />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default EducationFormCardComponent
