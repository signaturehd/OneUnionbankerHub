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
      preferredDate:moment(),
      forms: [],
      certName:'',
      issuingBody:'',
      address:'',
    }
    this.onChange = this.onChange.bind(this)
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
    const forms = this.state.forms.concat(Certificate)
    this.setState({ forms })
  }
   onChange (data) {
    this.setState({ preferredDate: data })
    this.props.getPreferredDate(
      data && data.format('DD-MM-YYYY')) /* date format*/
  }

  render () {
    const { preferredDate, endDate, certName, issuingBody, address } = this.state
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
                value={this.state.certName}
                onChange={e => this.updateInput('certName', e.target.value)}/>
              <GenericTextBox
                name="issuingBody"
                placeholder={ 'Issuing Body' }
                type={ 'text' }
                value={this.state.issuingBody}
                onChange={e => this.updateInput('issuingBody', e.target.value)}/>
              <GenericTextBox
                name="address"
                placeholder = { 'Address' }
                type = { 'text' }
                value={this.state.address}
                onChange={e => this.updateInput('address', e.target.value)}/>
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
