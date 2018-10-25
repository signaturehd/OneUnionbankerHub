import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/BookFlightPresenter'

import {
  GenericButton,
  GenericInput,
  CircularLoader,
  MultipleAttachments,
  DatePicker,
  Modal,
  Card,
  Line,
} from '../../ub-components/'

import BookFlightComponent from './components/BookFlightComponent'
import ResponseModal from '../notice/NoticeResponseModal'

import { Progress } from 'react-sweet-progress'
import './styles/bookStyles.css'
import { format } from '../../utils/numberUtils'
import moment from 'moment'

class BookFlightFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      showTicketModal : false,
      showFormModal: false,
      ticketMode : false,
      isDomestic : false,
      noticeResponse : '',
      requestId : '',
      purposeName : '',
      departureOrigin : '',
      departureDestination : '',
      returnOrigin : '',
      returnDestination : '',
      rturn : '',
      departureTime : '',
      returnTime : '',
      totalCostOfFlight : '',
      totalServiceCharge : '',
      valueAddedTax : '',
      totalAmount : '',
      bookflightArray : [],
      attachmentsData : [{ name : 'Flight Quatation Attachment' }],
      attachmentsData2 : [{ name : 'Flight Quatation Attachment' },
      { name : 'ERB Email Attachment' }]
    }
  }

  componentDidMount() {
    this.presenter.getTravels()
  }

  getTravels(bookflightArray) {
    this.setState({ bookflightArray })
  }

  departureTimeFunc (departureTime) {
    this.setState({ departureTime })
  }

  returnTimeFunc (returnTime) {
    this.setState({ returnTime })
  }

  totalAmountFunc(totalAmount) {
    this.setState({ totalAmount })
  }

  totalCostOfFlightFunc(totalCostOfFlight) {
    this.setState({ totalCostOfFlight })
  }

  totalServiceChargeFunc(totalServiceCharge) {
    this.setState({ totalServiceCharge })
  }

  valueAddedTaxFunc(valueAddedTax) {
    this.setState({ valueAddedTax })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  noticeResponse (noticeResponse) {
    this.setState({
      noticeResponse,
      showNoticeResponseModal : true,
      showFormModal : false
    })
  }

  resetValue () {
    this.setState({
      requestId : '',
      totalCostOfFlight : '',
      totalServiceCharge : '',
      departureTime : '',
      returnTime : '',
      isDomestic : '',
      attachmentsData : [{ name : 'Flight Quatation Attachment' }],
      attachmentsData2 : [{ name : 'Flight Quatation Attachment' },
      { name : 'ERB Email Attachment' }]
    })
  }

  submit () {
    const {
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      isDomestic,
      attachmentsData,
      attachmentsData2
    } = this.state

    isDomestic ?
    this.presenter.addBookFlight(
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      attachmentsData
    )
    :
    this.presenter.addBookFlight(
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      attachmentsData2
    )
  }

  render () {
    const {
      enabledLoader,
      showTicketModal,
      showFormModal,
      showNoticeResponseModal,
      noticeResponse,
      ticketMode,
      isDomestic,
      departureOrigin,
      departureDestination,
      returnOrigin,
      returnDestination,
      requestId,
      purposeName,
      rturn,
      departureTime,
      returnTime,
      totalCostOfFlight,
      totalServiceCharge,
      valueAddedTax,
      totalAmount,
      bookflightArray,
      attachmentsData,
      attachmentsData2
    } = this.state

    const { percentage } = this.props
    const depDate = moment(this.state.departureDate).format('MMMM DD, YYYY')
    const retDate = moment(this.state.returnDate).format('MMMM DD, YYYY')

    return (
      <div>
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
            }}
            noticeResponse={ noticeResponse }
          />
        }
        {
          showFormModal &&
          <Modal
          isDismisable = { true }
          onClose = { () => {
            this.setState({ showFormModal : false, isDomestic: false })
            }
          }>
            <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>{ `${purposeName}-${rturn}` }</h2>
            <br/>
            <Card>
              <div className = { 'book-card-grid-option' }>
                <div>
                  <h2 className = { 'font-size-14px font-weight-bold text-align-left unionbank-color' }>DEPARTURE</h2>
                  <h2 className = { 'font-size-16px font-weight-bold' }>{ departureOrigin }</h2>
                </div>
                <div>
                  <h2 className = { 'book-airplane-icon' }></h2>
                </div>
                <div className = { 'padding-top-20px' }>
                  <h2 className = { 'font-size-16px font-weight-bold text-align-center' }>{ departureDestination }</h2>
                </div>
              </div>
              {
                rturn === 'RoundTrip' &&
                <div className = { 'book-card-grid-option' }>
                  <div>
                    <h2 className = { 'font-size-14px font-weight-bold text-align-left unionbank-color' }>RETURN</h2>
                    <h2 className = { 'font-size-14px font-weight-lighter' }>{ returnOrigin }</h2>
                  </div>
                  <div>
                    <h2 className = { 'book-airplane-icon' }></h2>
                  </div>
                  <div className = { 'padding-top-20px' }>
                    <h2 className = { 'font-size-16px font-weight-bold text-align-center' }>{ returnDestination }</h2>
                  </div>
                </div>
              }
            </Card>
            <br/>
            <div>
            <h2>DEPARTURE</h2>
            </div>
            <GenericInput
              text = { depDate }
              type = { 'time' }
              value = { departureTime }
              onChange = { (e) => this.departureTimeFunc(e.target.value) }
            />
            {
              rturn === 'RoundTrip' &&
              <div>
              <h2>RETURN</h2>
              <GenericInput
              text = { retDate }
              type = { 'time' }
              value = { returnTime }
              onChange = { (e) => this.returnTimeFunc(e.target.value) }
              />
              </div>
            }
            <GenericInput
              text = { 'Total Cost of Flight' }
              type = { 'number' }
              value = { totalCostOfFlight }
              onChange = { (e) => this.totalCostOfFlightFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Total Service Charge' }
              type = { 'number' }
              value = { totalServiceCharge }
              onChange = { (e) => this.totalServiceChargeFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Value-Added Tax' }
              type = { 'numer' }
              value = { valueAddedTax }
              onChange = { (e) => this.valueAddedTaxFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Total Amount' }
              type = { 'number' }
              value = { totalAmount }
              onChange = { (e) => this.totalAmountFunc(e.target.value) }
            />
            {
              isDomestic ?
              <MultipleAttachments
                placeholder = { 'Form Attachments' }
                fileArray = { attachmentsData }
                setFile = { (attachmentsData) => this.setState(attachmentsData) }
              />
              :
              <MultipleAttachments
                placeholder = { 'Form Attachments' }
                fileArray = { attachmentsData2 }
                setFile = { (attachmentsData2) => this.setState(attachmentsData2) }
              />
            }

            <center>
              <GenericButton
                text = { 'Continue' }
                onClick = { () => this.submit() }
              />
            </center>
          </Modal>
        }
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>List of Booked Flights</h2>
            <br/>
            <h4>Below are the list of your booked flights.</h4>
          </div>
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
        {
          enabledLoader ?
          <center>
            <CircularLoader show = { enabledLoader }/>
          </center>
          :
          bookflightArray.length !==0 &&
            <BookFlightComponent
              showFormFunc = { (
                requestId,
                departureOrigin,
                departureDestination,
                departureDate,
                departureTime,
                returnOrigin,
                returnDestination,
                returnDate,
                returnTime,
                rturn,
                purposeName,
                isDomestic
              ) => this.setState({
                requestId,
                departureOrigin,
                departureDestination,
                departureDate,
                departureTime,
                returnOrigin,
                returnDestination,
                returnDate,
                returnTime,
                rturn,
                purposeName,
                isDomestic,
                showFormModal : true }) }
              cardDataHolder = { bookflightArray }/>
        }
      </div>
    )
  }
}

BookFlightFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(BookFlightFragment, Presenter )
