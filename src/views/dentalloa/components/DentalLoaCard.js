import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './dentalloa-component-style.css'
import TextBox from './DentalLoaTextBox'
import DentalLoaBranchModal from '../modal/DentalLoaBranchModal'
import DentalLoaDependentModal from '../modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from '../modal/DentalLoaProcedureModal'
import DatePicker from 'react-datepicker'
import moment from 'moment'
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
      date: moment(),
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  onChange (data) {
    this.setState({ date : data })
    this.props.preferedDate(date)
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
      receipient,
      branch,
      onClick,
      submitForm
    } = this.props

    const { date, showRecipientModal, showHealthwayBranchModal, showProcedureModal } = this.state

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
                 value = { receipient && receipient }
                 readOnly
                 placeholder = { text1 } />
          </div>
          <div className = { 'dentalloa-col span_1_of_3' }>
            <i className = { 'dentalloa-icon text2-icon' }/>
               <GenericTextBox
                 value = { branch && branch }
                 readOnly
                 onClick = { () => onClick(false, true, false)}
                 placeholder = { text2 } />
          </div>
          <div className = { 'dentalloa-col span_1_of_3' }>
            <i className = { 'dentalloa-icon text3-icon' }/>
              <DatePicker
                dateFormat="LL"
                readOnly
                selected={this.state.date}
                onChange={this.onChange}
                className = {'calendar'}
                calendarClassName = {"calendarClass"}/>
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
               onClick = { submitForm }
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
