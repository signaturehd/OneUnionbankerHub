import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/RequestFlightPresenter'

import {
  Modal,
  GenericButton,
  GenericInput,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  FloatingActionButton
} from '../../ub-components/'

import RequestFlightComponent from './components/RequestFlightComponent'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/request.css'

class RequestFlightFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showRequestModal : false,
      typeOfFlight : '',
      departurePurpose : '',
      departureOrigin : '',
      departureDestination : '',
      departureDate : '',
      departureRemarks : '',
      returnPurpose : '',
      returnOrigin : '',
      returnDestination : '',
      returnDate : '',
      returnRemarks : '',
      requestFlightArray : []
    }
  }

  componentDidMount() {
    this.presenter.getRequestFlightData()
  }

  departurePurposeFunc (departurePurpose) {
    this.setState({ departurePurpose })
  }

  departureOriginFunc (departureOrigin) {
    this.setState({ departureOrigin })
  }

  departureDestinationFunc (departureDestination) {
    this.setState({ departureDestination })
  }

  departureDateFunc (date) {
    this.setState({ departureDate : date.format('MM-DD-YYYY') })
  }

  departureRemarksFunc (departureRemarks) {
    this.setState({ departureRemarks })
  }

  returnPurposeFunc (returnPurpose) {
    this.setState({ returnPurpose })
  }

  returnOriginFunc (returnOrigin) {
    this.setState({ returnOrigin })
  }

  returnDestinationFunc (returnDestination) {
    this.setState({ returnDestination })
  }

  returnDateFunc (date) {
    this.setState({ returnDate : date.format('MM-DD-YYYY') })
  }

  returnRemarksFunc (returnRemarks) {
    this.setState({ returnRemarks })
  }

  getRequestFlightData(requestFlightArray) {
    this.setState({ requestFlightArray })
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
      showRequestModal,
      typeOfFlight,
      departurePurpose,
      departureOrigin,
      departureDestination,
      departureDate,
      departureRemarks,
      returnPurpose,
      returnOrigin,
      returnDestination,
      returnDate,
      returnRemarks,
      requestFlightArray
    } = this.state

    const { percentage } = this.props
    return (
      <div>
        { super.render() }
        {
          showRequestModal &&
          <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ showRequestModal : false }) }>
            <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Type of Flight</h2>
            <h2 className = { 'font-size-16px font-weight-lighter text-align-center' }>Did you want to fly one way or round trip?</h2>
            <br/>
            <div className = { 'request-grid-option' }>
              <GenericButton
                text = { 'One Way' }
                onClick = { () => this.setState({ typeOfFlight : 'One Way', showRequestModal : false }) }
              />
              <GenericButton
                  text = { 'RoundTrip' }
                  onClick = { () => this.setState({ typeOfFlight : 'RoundTrip', showRequestModal : false }) }
                />
            </div>
          </Modal>
        }
        {
          typeOfFlight &&
          <Modal
          isDismisable = { true }
          onClose = { () => this.setState({ typeOfFlight : '' }) }>
            <div>
              <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Select your departing flight details.</h2>
              <br/>
              <GenericInput
                text = { 'Purpose' }
                value = { departurePurpose }
                onChange = { (e) => this.departurePurposeFunc(e.target.value) }
              />
              <div className = { 'request-grid-option' }>
                <GenericInput
                  text = { 'Origin' }
                  value = { departureOrigin }
                  onChange = { (e) => this.departureOriginFunc(e.target.value) }
                />
                <GenericInput
                  text = { 'Destination' }
                  value = { departureDestination }
                  onChange = { (e) => this.departureDestinationFunc(e.target.value) }
                />
              </div>
              <DatePicker
                text = { 'Date of Departure' }
                selected = { departureDate && moment(departureDate) }
                onChange = { (e) => this.departureDateFunc(e) }
              />
              <GenericInput
                text = { 'Remarks' }
                value = { departureRemarks }
                onChange = { (e) => this.departureRemarksFunc(e.target.value) }
              />
            </div>
            {
              typeOfFlight === 'RoundTrip' &&
              <div>
                <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Select your return flight details.</h2>
                <br/>
                <GenericInput
                  text = { 'Purpose' }
                  value = { returnPurpose }
                  onChange = { (e) => this.returnPurposeFunc(e.target.value) }
                />
                <div className = { 'request-grid-option' }>
                  <GenericInput
                    text = { 'Origin' }
                    value = { returnOrigin }
                    onChange = { (e) => this.returnOriginFunc(e.target.value) }
                  />
                  <GenericInput
                    text = { 'Destination' }
                    value = { returnDestination }
                    onChange = { (e) => this.returnDestinationFunc(e.target.value) }
                  />
                </div>
                <DatePicker
                  readOnly
                  text = { 'Date of Departure' }
                  selected = { returnDate && moment(returnDate) }
                  onChange = { (e) => this.returnDateFunc(e) }
                />
                <GenericInput
                  text = { 'Remarks' }
                  value = { returnRemarks }
                  onChange = { (e) => this.returnRemarksFunc(e.target.value) }
                />
              </div>
            }
            <div className = { 'text-align-center' }>
              <GenericButton
                text = { 'Continue' }
              />
            </div>
          </Modal>
        }
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'font-size-30px text-align-left' }>List of Request Flights</h2>
            <br/>
            <h4>Below are the list of your requests flights</h4>
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
              requestFlightArray.length !==0 &&
                <RequestFlightComponent
                  cardDataHolder = { requestFlightArray }/>
            }

            <FloatingActionButton
              text="+"
              onClick={ () => this.setState({ showRequestModal : true })
              }
            />
      </div>
    )
  }
}

RequestFlightFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(RequestFlightFragment, Presenter )
