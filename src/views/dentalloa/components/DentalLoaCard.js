import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/dentalloaComponentStyle.css'
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
      <div className = { 'dentalloa-container' }>
        <div className = { 'dentalloa-grid-column-2' }>
          <div></div>
          <Card className = { 'dentalloa-card' }>
            <div className = { 'dentalloa-header' }>
              <div className = {'dentalloa-body'}>
                <GenericTextBox
                  onClick = { () => onClick(true, false, false) }
                  value = { recipient && recipient }
                  readOnly
                  placeholder = { text1 } />
                <GenericTextBox
                  value = { branch && branch }
                  readOnly
                  onClick = { () => onClick(false, true, false) }
                  placeholder = { text2 } />
                <div>
                  <DatePicker
                    dateFormat = { 'DD-MM-YYYY' }
                    readOnly
                    selected = { preferredDate }
                    onChange = { this.onChange }
                    className = { 'calendar' }
                    calendarClassName = { 'calendarClass' }/>
                  <label className="dentalloa-label">Date</label>
                </div>
              </div>
            </div>
            <div className = { 'dentalloa-footer-left' }>
            <div className={'procedure-header'}>
            <div className={'grid'}>
              <h4 className={ 'dentalloa-procedure-list-title' }>PROCEDURES</h4>
              <GenericButton
                onClick = { () => onClick(false, false, true) }
                type = { 'button' }
                text = { 'Add procedure' }
                className = { 'dentalloa-procedure' }
                value = { 'Procedures' } />
              </div>
            </div>
            {
            selectedProcedures && selectedProcedures.map((procedure, key) => (
                 <div className = { 'dentalloa-procedure-list' }>
                   <div key = { key } className = { 'procedure-grid' }>
                      <div className={ 'procedure-div' }>
                        <h5 className={'dentalloa-procedure-list-name'}>{ procedure.name }</h5>
                        <h6 className={'dentalloa-procedure-list-limit'}>{ `${  procedure.limit}` }</h6>
                      </div>
                      <img
                        src={ require('../../../ub-components/Notify/images/x-circle.png') }
                        className='close-button'
                        onClick={
                          () => {
                            selectedProcedures.splice(key, 1)
                            this.setState({ selectedProcedures })
                          }
                        }
                      />
                   </div>
                   <br/>
                 </div>
                 ))
             }
             <br/>


            <div className = { 'dentalloa-button-submit' }>
              <GenericButton
                 className = { 'dentalloa-button' }
                 onClick = { submitForm }
                 text = { submit }/>
            </div>
          </div>
        </Card>
      </div>
    </div>
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
