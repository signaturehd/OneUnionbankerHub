import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/dentalLoaComponentStyle.css'
import DentalLoaBranchModal from '../modal/DentalLoaBranchModal'
import DentalLoaDependentModal from '../modal/DentalLoaDependentModal'
import DentalLoaProcedureModal from '../modal/DentalLoaProcedureModal'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
  GenericTextBox,
  GenericButton,
  Card,
  List
} from '../../../ub-components'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'

class DentalLoaCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmation: false,
      showRecipientModal : false, // Recipient Modal
      showHealthwayBranchModal : false, // Recipient Branch Modal
      showProcedureModal : false, // Recipient Procedure Modal
      datePicker : '',
      preferredDate: moment(),
    }

    this.onChange = this.onChange.bind(this)
  }

  /* store the date */
  onChange (data) {
    this.setState({ preferredDate: data })
    this.props.getPreferredDate(
      data && data.format('DD-MM-YYYY')) /* date format*/
  }

  render () {
    const {
      text1,
      text2,
      text3,
      text4,
      onClose,
      submit,
      recipient,
      branch,
      onClick,
      submitForm,
      selectedProcedures
    } = this.props

    const {
      preferredDate,
      showRecipientModal,
      showHealthwayBranchModal,
      showProcedureModal } = this.state

    return (
      <Card className = { 'dentalloa-card' }>
        <div className = { 'dentalloa-header' }>
          <div className = {'dentalloa-body'}>
            <div className = { 'dentalloa-col' }>
              <i className = { 'dentalloa-icon text1-icon' }/>
               <GenericTextBox
                 onClick = { () => onClick(true, false, false) }
                 value = { recipient && recipient }
                 readOnly
                 placeholder = { text1 } />
          </div>
          <div className = { 'dentalloa-col' }>
            <i className = { 'dentalloa-icon text2-icon' }/>
             <GenericTextBox
               value = { branch && branch }
               readOnly
               onClick = { () => onClick(false, true, false) }
               placeholder = { text2 } />
          </div>
          <div className = { 'dentalloa-col' }>
            <i className = { 'dentalloa-icon text3-icon' }/>
              <DatePicker
                dateFormat = { 'DD-MM-YYYY' }
                readOnly
                selected = { preferredDate }
                onChange = { this.onChange }
                className = { 'calendar' }
                calendarClassName = { 'calendarClass' }/>
          </div>
          </div>
        </div>
        <div className = { 'dentalloa-footer-left' }>
        {
        selectedProcedures && selectedProcedures.map((procedure, key) => (
             <div>
               <div key = { key } className = { 'procedure-grid' }>
                  <List
                    description = { `${  procedure.limit}` }
                    title = { procedure.name }
                  />
                 <button
                   className = { 'dentalloa-cancel-button' }
                   onClick = { () => {
                   selectedProcedures.splice(key, 1)
                   this.setState({ selectedProcedures })
                  }}>X</button>
               </div>
               <br/>
             </div>
             ))
         }
         <br/>
        <GenericButton
          onClick = { () => onClick(false, false, true) }
          type = { 'button' }
          text = { text4 }
          className = { 'dentalloa-procedure' }
          value = { 'Procedures' } />

        <div className = { 'dentalloa-button-submit' }>
          <GenericButton
             className = { 'dentalloa-button' }
             onClick = { submitForm }
             text = { submit }/>
        </div>
      </div>
    </Card>
    )
  }
}

DentalLoaCard.propTypes = {
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  text1   : PropTypes.string,
  text2   : PropTypes.string,
  text3   : PropTypes.string,
  submit  : PropTypes.string,
  text4  : PropTypes.string,
  selectedProcedures : PropTypes.array,
  branch : PropTypes.string,
  submitForm : PropTypes.func,
}

DentalLoaCard.defaultProps = {
  submit  : 'Submit',
  text1   : 'Recipient',
  text2   : 'Healthway Branch',
  text3   : 'Preferred Schedule',
  text4   : 'PROCEDURE'
}

export default DentalLoaCard
