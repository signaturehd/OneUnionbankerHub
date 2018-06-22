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
      aboutMeTextValue: '',

    }
    this.onChange = this.onChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
    this.handleMeChanged = this.handleMeChanged.bind(this)
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

 handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value })
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
      preferredDate,
      endDate,
      aboutMeTextValue } = this.state
    const { onGetPurposeOfLoan } = this.props
    return (
      <div className={ 'general-container' }>
        <div>
          <Card className={ 'general-form-card' }>
            <h4>
             About Me
            </h4>
            <div className={'general-form-card-body' }>
              <FileUploader
                type={ 'file' }
                placeholder={ 'Profile Photo' }
                />
              <GenericTextBox
                placeholder={ 'Describe yourself' }
                type={ 'text' }
                value={this.state.aboutMeTextValue}
                onChange={e => this.updateInput('aboutMeTextValue', e.target.value)}/>
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
