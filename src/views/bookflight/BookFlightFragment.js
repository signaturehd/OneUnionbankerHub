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
import BookFlightFormComponent from './components/BookFlightFormComponent'
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
      submitLoader : false,
      showNoticeResponseModal : false,
      showTicketModal : false,
      showForm: false,
      ticketMode : false,
      isDomestic : false,
      showTravelGroup : false,
      noticeResponse : '',
      requestId : '',
      purposeName : '',
      departureOrigin : '',
      departureDestination : '',
      returnOrigin : '',
      returnDestination : '',
      rturn : '',
      departureDate : '',
      departureTime : '',
      returnDate : '',
      returnTime : '',
      totalCostOfFlight : '0',
      totalServiceCharge : '0',
      valueAddedTax : '0',
      bookflightArray : [],
      travelGroupArray : [],
      travelGroupId : '',
      travelGroup : '',
      attachmentsData : [{ name : 'Flight Quatation Attachment' }],
      attachmentsData2 : [{ name : 'Flight Quatation Attachment' },
      { name : 'ERB Email Attachment' }]
    }
  }

  componentDidMount() {
    this.presenter.getTravels()
    this.presenter.getTravelGroup()
  }

  getTravels(bookflightArray) {
    this.setState({ bookflightArray })
  }

  getTravelGroup(travelGroupArray) {
    this.setState({ travelGroupArray })
  }

  departureTimeFunc (departureTime) {
    this.setState({ departureTime })
  }

  returnTimeFunc (returnTime) {
    this.setState({ returnTime })
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

  travelGroupArrayFunc () {
    const { travelGroupArray } = this.state
    const newArray = []
    travelGroupArray.map((resp,key) => {
        const object = {
          id : resp.id,
          name : resp.firstName + resp.middleName + resp.lastName
        }
        newArray.push(object)
      }
    )
    return newArray
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideSubmitLoader () {
    this.setState({ submitLoader : false })
  }

  showSubmitLoader () {
    this.setState({ submitLoader : true })
  }

  noticeResponse (noticeResponse) {
    this.setState({
      noticeResponse,
      showNoticeResponseModal : true,
      showForm : false
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
      valueAddedTax,
      travelGroupId,
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
      valueAddedTax,
      travelGroupId,
      attachmentsData
    )
    :
    this.presenter.addBookFlight(
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      valueAddedTax,
      travelGroupId,
      attachmentsData2
    )
  }

  navigate () {
    this.props.history.push('/mytravel/travel')
  }

  render () {
    const {
      enabledLoader,
      submitLoader,
      showTicketModal,
      showForm,
      showNoticeResponseModal,
      noticeResponse,
      showTravelGroup,
      ticketMode,
      isDomestic,
      departureOrigin,
      departureDestination,
      returnOrigin,
      returnDestination,
      requestId,
      purposeName,
      rturn,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
      totalCostOfFlight,
      totalServiceCharge,
      valueAddedTax,
      bookflightArray,
      travelGroupArray,
      travelGroupId,
      travelGroup,
      attachmentsData,
      attachmentsData2
    } = this.state

    const { percentage } = this.props
    const dDateSplit = departureDate && departureDate.split('Z')
    const rDateSplit = returnDate && returnDate.split('Z')
    const depDate = moment(dDateSplit[0]).format('MMMM DD, YYYY')
    const retDate = moment(rDateSplit[0]).format('MMMM DD, YYYY')
    const totalAmount = (parseFloat(totalCostOfFlight.replace (/,/g, "")) + parseFloat(totalServiceCharge.replace (/,/g, "")) + parseFloat(valueAddedTax.replace (/,/g, "")))
    return (
      <div className = { 'default-body-grid' }>
        <div></div>
        <div>
          {
            submitLoader ?
            <Modal>
              <center>
                <h2>Please wait...</h2>
                <CircularLoader show = { submitLoader }/>
              </center>
            </Modal>
            :
            showNoticeResponseModal &&
            <ResponseModal
              onClose={ () => {
                this.setState({ showNoticeResponseModal : false, showForm : false })
              }}
              noticeResponse={ noticeResponse }
            />
          }
          <i
            className={ 'back-arrow' }
            onClick={ () => this.navigate() }>
          </i>
          <br/>
          <br/>
          <div className = { 'percentage-grid' }>
            <div>
              <h2 className={ 'font-size-30px text-align-left' }>List of Booked Flights</h2>
              <br/>
              <h4>Below are the list of your booked flights.</h4>
            </div>
          </div>
          <br/>
          <Line />
          <br/>
          {
            showForm ?
            <BookFlightFormComponent
              showTicketModal = { showTicketModal }
              showNoticeResponseModal = { showNoticeResponseModal }
              noticeResponse = { noticeResponse }
              ticketMode = { ticketMode }
              isDomestic = { isDomestic }
              departureOrigin = { departureOrigin }
              departureDestination = { departureDestination }
              returnOrigin = { returnOrigin }
              returnDestination = { returnDestination }
              requestId = { requestId }
              purposeName = { purposeName }
              rturn = { rturn }
              departureDate = { depDate }
              departureTime = { departureTime }
              departureTimeFunc = { (e) => this.departureTimeFunc(e) }
              returnDate = { retDate }
              returnTime = { returnTime }
              returnTimeFunc = { (e) => this.returnTimeFunc(e) }
              totalCostOfFlight = { totalCostOfFlight }
              totalCostOfFlightFunc = { (e) => this.totalCostOfFlightFunc(e) }
              totalServiceCharge = { totalServiceCharge }
              totalServiceChargeFunc = { (e) => this.totalServiceChargeFunc(e) }
              valueAddedTax = { valueAddedTax }
              valueAddedTaxFunc = { (e) => this.valueAddedTaxFunc(e) }
              totalAmount = { totalAmount }
              bookflightArray = { bookflightArray }
              travelGroupArray = { this.travelGroupArrayFunc() }
              showTravelGroup = { showTravelGroup }
              travelGroupId = { travelGroupId }
              travelGroup = { travelGroup }
              showTravelGroupFunc = { () => this.setState({ showTravelGroup : true }) }
              travelGroupHeadFunc = { (travelGroupId, travelGroup) =>
                this.setState({
                  travelGroupId,
                  travelGroup,
                  showTravelGroup : false
                })
              }
              onClose = { () => this.setState({ showTravelGroup : false }) }

              attachmentsData = { attachmentsData }
              attachmentsData2 = { attachmentsData2 }
              submitFunc = { () => this.submit() }
            />
            :
            enabledLoader ?
            <center>
              <CircularLoader show = { enabledLoader }/>
            </center>
            :
            bookflightArray.length !==0 ?
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
                  showForm : true }) }
                cardDataHolder = { bookflightArray }/>
                :
                <center>
                  <h2>No records</h2>
                </center>
          }
        </div>
        <div></div>
      </div>
    )
  }
}

BookFlightFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(BookFlightFragment, Presenter )
