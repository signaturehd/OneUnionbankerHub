import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



class Certificate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preferredDate: moment(),
      endDate: moment(),

    }
    this.onChange = this.onChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
  }

   onChange (data) {
    this.setState({ preferredDate: data })
    this.props.getPreferredDate(
      data && data.format('DD-MM-YYYY')) /* date format*/
  }
  onEndChange (data) {
   this.setState({ endDate: data })
   this.props.getPreferredDate(
     data && data.format('DD-MM-YYYY')) /* date format*/
 }



  render() {
    const {
      preferredDate, endDate} = this.state
    const {
      onGetPurposeOfLoan } = this.props

    return(
      <div className = {'general-container'}>
        <div>
          <Card className = { 'general-form-card' }>
            <h4>
             Certificate
            </h4>
            <div className = {'general-form-card-body '}>
              <GenericTextBox
                type = 'text'
                placeholder = { 'Certificate Name' }
                type = { 'text' }/>
              <GenericTextBox
                placeholder = { 'Issuing Body' }
                type = { 'text' }/>
              <GenericTextBox
                placeholder = { 'Address' }
                type = { 'text' }/>
              <h3> Date Issued: <DatePicker
                dateFormat = { 'DD-MM-YYYY' }
                readOnly
                selected = { preferredDate }
                onChange = { this.onChange }
                className = { 'calendar' }
                calendarClassName = { 'calendarClass' }/>  </h3>

            </div>
          </Card>
        </div>
      </div>
    )
  }
}

Certificate.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default Certificate
