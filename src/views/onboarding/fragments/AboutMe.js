import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



class AboutMe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      preferredDate: moment(),
      endDate: moment(),
      aboutMeTextValue: '',

    }
    this.onChange = this.onChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
    this.handleMeChanged = this.handleMeChanged.bind(this)
  }

handleMeChanged (event) {
  this.setState({ aboutMeTextValue:event.target.value })
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



  render () {
    const {
      preferredDate, endDate, aboutMeTextValue } = this.state
    const {
      onGetPurposeOfLoan } = this.props
    return (
      <div className = {'general-container'}>
        <div>
          <Card className = { 'general-form-card' }>
            <h4>
             About Me
            </h4>
            <div className = {'general-form-card-body '}>
              <FileUploader
                type = 'file'
                placeholder = { 'Profile Photo' }
                />
              <GenericTextBox
                value={this.state.aboutMeTextValue }
                onChange = {this.handleMeChanged }
                placeholder = { 'Describe yourself' }
                type = { 'text' }/>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

AboutMe.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default AboutMe
