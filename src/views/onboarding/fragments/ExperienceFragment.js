import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



class Experience extends Component {
  constructor (props) {
    super(props)
    this.state = {
      preferredDate: moment(),
      endDate: moment(),
      forms:[],
      compName:null,
      address:null,
      position:null,
      textarea:null,
    }
    this.onChange = this.onChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
    this.add = this.add.bind(this)
  }

  add () {
    const forms = this.state.forms.concat(Experience)
    this.setState({ forms })
  }

   onChange (data) {
    this.setState({ preferredDate: data })
    this.props.getPreferredDate(
      data && data.format('DD-MM-YYYY')) /* date format*/
  }
  onEndChange (data) {
   this.setState({ endDate: data })
   this.props.getendDate(
     data && data.format('DD-MM-YYYY')) /* date format*/
 }


  render () {
    const {
      preferredDate,
      endDate, compName,address,position,textarea } = this.state
      const forms = this.state.forms.map((Element, index) => <Element key={ index } index={ index } />)

    return (
      <div className={ 'general-container' }>
        <div>
          <Card className={ 'general-form-card' }>
            <h4>
             Experience
            </h4>
            <div className={ 'general-form-card-body' }
              name = { `document-${ this.props.index }-document` } >

              <GenericTextBox
                type={ 'text' }
                placeholder={ 'Company Name' }
                type={ 'text' }/>
              <GenericTextBox
                placeholder={ 'Address' }
                type={ 'text' }/>
              <GenericTextBox
                placeholder={ 'Position' }
                type={ 'text' }/>
              <label> Inclusive Dates </label>
              <h3> From Year: <DatePicker
                dateFormat={ 'DD-MM-YYYY' }
                readOnly
                selected={ preferredDate }
                onChange={ this.onChange }
                className={ 'calendar' }
                calendarClassName={ 'calendarClass' }/> to </h3>
              <DatePicker dateFormat={'DD-MM-YY'}
                readOnly
                selected={ endDate }
                onEndChange={ this.onEndChange }
                className={ 'calendar' }
                calendarClassName={ 'calendarClass' }/>
              <textarea
                onChange={ e => this.getTextareaValue(e.target.value) }
                className={ 'experience-textarea' }
                placeholder={ 'Brief description of duties' }/>
                <div>
                <GenericButton
                  onClick = { this.add }
                  type = { 'button' }
                  text = { 'Add Experience' }/>
               </div>
            </div>
          </Card>
          <div className="inputs">
        { forms }
      </div>
        </div>
      </div>
    )
  }
}

Experience.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default Experience
