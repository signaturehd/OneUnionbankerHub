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

import { Progress } from 'react-sweet-progress'
import './styles/bookStyles.css'
import moment from 'moment'

class BookFlightFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showTicketModal : false,
      showFormModal: false,
      ticketMode : false,
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
      attachmentsData : [
        {
          name : 'Flight Quatation Attachment'
        },
        {
          name : 'ERB Email Attachment'
        }
      ]
    }
  }

  componentDidMount() {
    this.presenter.getTravels()
  }

  getTravels(bookflightArray) {
    this.setState({ bookflightArray })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  render () {
    const {
      enabledLoader,
      showTicketModal,
      showFormModal,
      ticketMode,
      departureOrigin,
      departureDestination,
      returnOrigin,
      returnDestination,
      purposeName,
      rturn,
      departureTime,
      returnTime,
      totalCostOfFlight,
      totalServiceCharge,
      valueAddedTax,
      totalAmount,
      bookflightArray,
      attachmentsData
    } = this.state

    const { percentage } = this.props
    return (
      <div>
        {
          showFormModal &&
          <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showFormModal : false }) }>
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
              text = { 'Oct 18, 2018' }
              type = { 'time' }
            />
            {
              rturn === 'RoundTrip' &&
              <div>
              <h2>RETURN</h2>
              <GenericInput
              text = { 'Oct 18, 2018' }
              type = { 'time' }
              />
              </div>
            }
            <GenericInput
              text = { 'Total Cost of Flight' }
              type = { 'number' }
            />
            <GenericInput
              text = { 'Total Service Charge' }
              type = { 'number' }
            />
            <GenericInput
              text = { 'Value-Added Tax' }
              type = { 'numer' }
            />
            <GenericInput
              text = { 'Total Amount' }
              type = { 'number' }
            />
            <MultipleAttachments
              placeholder = { 'Form Attachments' }
              fileArray = { attachmentsData }
              setFile = { (attachmentsData) => this.setState(attachmentsData) }
            />
            <center>
              <GenericButton
                text = { 'Continue' }
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
                departureOrigin,
                departureDestination,
                returnOrigin,
                returnDestination,
                rturn,
                purposeName
              ) => this.setState({
                departureOrigin,
                departureDestination,
                returnOrigin,
                returnDestination,
                rturn,
                purposeName,
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
