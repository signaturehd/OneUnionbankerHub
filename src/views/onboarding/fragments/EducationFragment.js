import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



class Education extends Component {
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
    const { preferredDate, endDate} = this.state
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      preferredFormData,
      offset,
      onGetPurposeOfLoan } = this.props

    return(
      <div className={ 'general-container' }>
        <div>
          <Card className={ 'general-form-card' }>
            <h4>
             Education
            </h4>
            <div className={ 'general-form-card-body' }>
              <GenericTextBox
                type={ 'text' }
                onClick={ () =>
                  this.setState({ showPurposeOfAvailment : true }) }
                placeholder={ 'School' }
                type={ 'text' }/>
              <GenericTextBox
                placeholder={ 'Degree' }
                type={ 'text' }/>
              <GenericTextBox
                placeholder={ 'Course' }
                type={ 'text' }/>
              <GenericTextBox
                placeholder={ 'Special Honors' }
                type={ 'text' }/>
              <label> Inclusive Dates </label>
              <h3> From Year: <DatePicker
                dateFormat={ 'DD-MM-YYYY' }
                readOnly
                selected={ preferredDate }
                onChange={ this.onChange }
                className={ 'calendar' }
                calendarClassName={ 'calendarClass' }/> to </h3>
              <DatePicker dateFormat={ 'DD-MM-YY' }
                readOnly
                selected={ endDate }
                onEndChange={ this.onEndChange }
                className={ 'calendar' }
                calendarClassName={ 'calendarClass' }/>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

Education.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default Education
