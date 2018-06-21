import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



class Education extends Component {
  constructor (props) {
    super(props)
    this.state = {
      preferredDate: moment(),
      endDate: moment(),
      forms: [],
      school: null,
      degree: null,
      course: null,
      specialH: null,
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
    const forms = this.state.forms.concat(Education)
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
    const { preferredDate, endDate, school, degree, course, specialH } = this.state
      const forms = this.state.forms.map((Element, index) => <Element key={ index } index={ index } />)

    return (
      <div className={ 'general-container' }>
        <div>
          <Card className={ 'general-form-card' }>
            <h4>
             Education
            </h4>
            <div className={ 'general-form-card-body' }
               name = { `document-${ this.props.index }-document` } >
              <GenericTextBox
                name="school"
                type={ 'text' }
                placeholder={ 'School' }
                onChange={this.handleChange}/>
              <GenericTextBox
                name="degree"
                placeholder={ 'Degree' }
                type={ 'text' }
                onChange={this.handleChange}/>
              <GenericTextBox
                name="course"
                placeholder={ 'Course' }
                type={ 'text' }
                onChange={this.handleChange}/>
              <GenericTextBox
                name="specialH"
                placeholder={ 'Special Honors' }
                type={ 'text' }
                onChange={this.handleChange}/>
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
                <div>
                <GenericButton
                  onClick = { this.add }
                  type = { 'button' }
                  text = { 'Add Education' }/>
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

Education.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default Education
