import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



class Certificate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      preferredDate: moment(),
      endDate: moment(),
      forms: [],

    }
    this.onChange = this.onChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
    this.add = this.add.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  add () {
    const forms = this.state.forms.concat(Certificate)
    this.setState({ forms })
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
    const { preferredDate, endDate } = this.state
    const forms = this.state.forms.map((Element, index) => {
    return <Element key={ index } index={ index } />
    })

    return (
      <div className={ 'general-container' }>
        <div>
          <Card className={ 'general-form-card' }>
            <h4>
             Certificate
            </h4>
            <div className={ 'general-form-card-body' }
              name = { `document-${ this.props.index }-document` } >

              <GenericTextBox
                name="certName"
                type={ 'text' }
                placeholder={ 'Certificate Name' }
                type={ 'text' }
                onChange={this.handleChange}/>
              <GenericTextBox
                name="issuingBody"
                placeholder={ 'Issuing Body' }
                type={ 'text' }
                onChange={this.handleChange}/>
              <GenericTextBox
                name="address"
                placeholder = { 'Address' }
                type = { 'text' }
                onChange={this.handleChange}/>
              <h3> Date Issued: <DatePicker
                dateFormat={ 'DD-MM-YYYY' }
                readOnly
                selected={ preferredDate }
                onChange={ this.onChange }
                className={ 'calendar' }
                calendarClassName={ 'calendarClass' }/>
            </h3>
                <div>
                <GenericButton
                  onClick = { this.add }
                  type = { 'button' }
                  text = { 'Add More Certificate' }/>
               </div>
            </div>
          </Card>
        </div>
        <div className="inputs">
        { forms }
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
