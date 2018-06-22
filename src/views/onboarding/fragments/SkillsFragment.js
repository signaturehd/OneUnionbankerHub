import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/general.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'
import DatePicker from 'react-datepicker'
import moment from 'moment'



class SkillsFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      preferredDate: moment(),
      endDate: moment(),
      skills: '',
      skillLevel: '',
      forms:[],

    }
    this.onChange = this.onChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
    this.add = this.add.bind(this)
    this.handleChange = this.handleChange.bind(this)
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


  add () {
    const forms = this.state.forms.concat(SkillsFragment)
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
    const {
      preferredDate, endDate,skills,skillLevel } = this.state
      const forms = this.state.forms.map((Element, index) => <Element key={ index } index={ index } />)
    return (
      <div className={ 'general-container' }>
        <div>
          <Card className={ 'general-form-card' }>
            <h4>
             Skills
            </h4>
            <div className={ 'general-form-card-body' }
               name = { `document-${ this.props.index }-document` } >
              <GenericTextBox
                type={ 'text' }
                placeholder={ 'Input Skills' }
                type={ 'text' }
                value={this.state.skills}
                onChange={e => this.updateInput('skills', e.target.value)}/>
              <GenericTextBox
                placeholder={ 'Skills Level' }
                type={ 'text' }
                value={this.state.skillLevel}
                onChange={e => this.updateInput('skillLevel', e.target.value)}/>
                  <div>
                <GenericButton
                  onClick = { this.add }
                  type = { 'button' }
                  text = { 'Add Skills' }/>
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

SkillsFragment.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default SkillsFragment
