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
      school: '',
      degree: '',
      course: '',
      specialH: '',

    }
    this.onChange = this.onChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
    this.add = this.add.bind(this)
  }

  componentDidMount () {
    this.hydrateStateWithsessionStorage()
    window.addEventListener(
      'beforeunload',
      this.saveStateTosessionStorage.bind(this)
    )
  }

  componentWillUnmount () {
    window.removeEventListener(
      'beforeunload',
      this.saveStateTosessionStorage.bind(this)
    )
    this.saveStateTosessionStorage()
  }

  hydrateStateWithsessionStorage () {
    for (let key in this.state) {
      if (sessionStorage.hasOwnProperty(key)) {
        let value = sessionStorage.getItem(key)
        try {
          value = JSON.parse(value)
          this.setState({ [key]: value })
        } catch (e) {
          this.setState({ [key]: value })
        }
      }
    }
  }

  saveStateTosessionStorage () {
    for (let key in this.state) {
      sessionStorage.setItem(key, JSON.stringify(this.state[key]))
    }
  }

  updateInput(key, value) {
    this.setState({ [key]: value })
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
                value={this.state.school}
                onChange={e => this.updateInput('school', e.target.value)}/>
              <GenericTextBox
                name="degree"
                placeholder={ 'Degree' }
                type={ 'text' }
                value = {this.state.degree}
                onChange={e => this.updateInput('degree', e.target.value)}/>
              <GenericTextBox
                name="course"
                placeholder={ 'Course' }
                type={ 'text' }
                value = {this.state.course}
                onChange={e => this.updateInput('course', e.target.value)}/>
              <GenericTextBox
                name="specialH"
                placeholder={ 'Special Honors' }
                type={ 'text' }
                value = {this.state.specialH}
                onChange={e => this.updateInput('specialH', e.target.value)}/>
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
