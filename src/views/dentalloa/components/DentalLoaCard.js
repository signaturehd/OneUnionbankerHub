import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './dentalloa-component-style.css'
import TextBox from './DentalLoaTextBox'
import DentalLoaBranchModal from '../modal/DentalLoaBranchModal'
import DentalLoaDependentModal from '../modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from '../modal/DentalLoaProcedureModal'
import Datepicker from 'react-date-picker'
import { GenericTextBox, GenericButton, Card } from '../../../ub-components'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'

class DentalLoaCard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
      showRecipientModal : false,
      showHealthwayBranchModal : false,
      showProcedureModal : false,
      datePicker : '',
      date: new Date(),
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  onChange (date) {
    this.setState({ date })
  }

  render () {
    const {
      proceedModal,
      text1,
      text2,
      text3,
      text4,
      onFocus,
      details,
      onClose,
      submit,
      presenter,
      onClick
    } = this.props
    const { showRecipientModal, showHealthwayBranchModal, showProcedureModal } = this.state
    return (
      <Card className={ 'dentalloa-card' }>
      <form onSubmit = { this.handleSubmit }>
        <div className = {'dentalloa-header'} >
          <h5 > LOA Details </h5>
          <div className = {'dentalloa-body '}>
            <div className = { 'dentalloa-col span_1_of_3' }>
              <i className = { 'dentalloa-icon text1-icon' }/>
               <GenericTextBox
                 onClick = { () => onClick(true, false, false)}
                 type = { 'button' }
                 className = { 'fileUploader' }
                 placeholder = { text1 } />
          </div>
          <div className = { 'dentalloa-col span_1_of_3' }>
            <i className = { 'dentalloa-icon text2-icon' }/>
               <GenericTextBox
                 type = { 'button' }
                 className = { 'fileUploader' }
                 onClick = { () => onClick(false, true, false)}
                 placeholder = { text2 } />
          </div>
          <div className = { 'dentalloa-col span_1_of_3' }>
            <i className = { 'dentalloa-icon text3-icon' }/>
              <Datepicker
                placeholder = { 'Enter Present Date' }
                showMonthDrowdown
                showYearDrowdown
                onChange={this.onChange}
                value={this.state.date}
                dropdownMode = "select"
                calendarName = {"calendarClass"}/>
          </div>
          </div>
        </div>
        <div className = {'dentalloa-footer-left'}>
          <GenericButton
            onClick = { () => onClick(false, false, true)}
            type = {'button'}
            text = { text4 }
            className = {'dentalloa-procedure' }
            value = { 'Procedures' } />
          <div className = { 'dentalloa-button-submit' }>
            <GenericButton
               className = { 'dentalloa-button' }
               onClick = { onClick }
              text = { submit }/>
          </div>
        </div>
      </form>
    </Card>
    )
  }
}

DentalLoaCard.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  details : PropTypes.object,
  text1   : PropTypes.string,
  text2   : PropTypes.string,
  text3   : PropTypes.string,
  onFocus : PropTypes.func,
  submit  : PropTypes.string,
  text4  : PropTypes.string,
}

DentalLoaCard.defaultProps = {
  submit  : 'Submit',
  text1   : 'Recipient',
  text2   : 'Healthway Branch',
  text3   : 'Preferred Schedule',
  text4   : 'PROCEDURE'
}

export default DentalLoaCard
