import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  GenericInput,
  SingleInputModal,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  FloatingActionButton
} from '../../../ub-components/'

import AreaModal from './../modal/AreaModal'

import ResponseModal from '../../notice/NoticeResponseModal'

import { format } from '../../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/requestStyles.css'

class RequestFlightFormComponent extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const {
      enabledLoader,
      submitLoader,
      showRequestModal,
      showAreaModal,
      showPurposeModal,
      showNoticeResponseModal,
      noticeResponse,
      areaSwitch,
      typeOfFlight,
      showDepartureTime,
      showReturnTime,
      showPurposeModalFunc,
      onClose,
      nextPageNumberFunc,
      previousPageNumberFunc,
      findFunc,
      purposeId,
      purposeName,
      purposeFunc,
      departureOriginId,
      departureOrigin,
      departureOriginFunc,
      setAreaFunc,
      departureDestinationId,
      departureDestination,
      departureDestinationFunc,
      departureDate,
      departureDateFunc,
      departureTimeId,
      departureTime,
      departureTimeFunc,
      showDepartureTimeFunc,
      departureRemarks,
      departureRemarksFunc,
      returnOriginId,
      returnOrigin,
      returnOriginFunc,
      returnDestinationId,
      returnDestination,
      returnDestinationFunc,
      returnDate,
      returnDateFunc,
      returnTimeId,
      returnTime,
      returnTimeFunc,
      showReturnTimeFunc,
      returnRemarks,
      returnRemarksFunc,
      pageNumber,
      findArea,
      timeArray,
      requestFlightArray,
      purposeArray,
      areaArray,
      submit
    } = this.props

    const { percentage } = this.props
    return (
      <div className = { 'request-container' }>
        {
          submitLoader ?
          <Modal>
            <center>
              <CircularLoader show = { submitLoader }/>
            </center>
          </Modal>
          :
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
            }}
            noticeResponse={ noticeResponse }
          />
        }
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
          showPurposeModal &&
            <SingleInputModal
              label = { 'Select the purpose of your travel.' }
              inputArray = { purposeArray }
              selectedArray = { (purposeId, purposeName) =>
                  purposeFunc(purposeId, purposeName)
              }
              onClose = { () => onClose() }
            />
        }
        {
          showAreaModal &&
            <AreaModal
              enabledLoader = { enabledLoader }
              label = { 'Area' }
              pageNumber = { pageNumber }
              nextPageNumberFunc = { (resp) => {
                  nextPageNumberFunc(resp)
                }
              }
              previousPageNumberFunc = { (resp) => {
                  previousPageNumberFunc(resp)
                }
              }
              findFunc = { (resp) => {
                  findFunc(resp)
                }
              }
              inputArray = { areaArray }
              selectedArray = { (areaId, areaName) =>
                setAreaFunc(areaId, areaName)
              }
              onClose = { () => onClose() }
              />
          }
        <div className = { 'request-grid-column-x3' }>
          <div></div>
          <div>
          <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Select your departing flight details.</h2>
          <br/>
          <GenericInput
            text = { 'Purpose' }
            value = { purposeName }
            onClick = { () => showPurposeModalFunc() }
          />
          <div className = { 'request-grid-option' }>
            <GenericInput
              text = { 'Origin' }
              value = { departureOrigin }
              onClick = { () => departureOriginFunc() }
            />
            <GenericInput
              text = { 'Destination' }
              value = { departureDestination }
              onClick = { () => departureDestinationFunc() }
            />
          </div>
          <div className = { 'request-grid-option' }>
            <DatePicker
              text = { 'Preferred Date of Departure' }
              selected = { departureDate && moment(departureDate) }
              onChange = { (e) => departureDateFunc(e) }
              minDate = { moment() }
            />
            {
              showDepartureTime &&
              <SingleInputModal
                label = { 'Preferred Time' }
                inputArray = { timeArray }
                selectedArray = { ( departureTimeId, departureTime ) =>
                  departureTimeFunc(departureTimeId, departureTime)
                }
                onClose = { () => onClose() }
              />
            }
            <GenericInput
              text = { 'Preferred Time' }
              value = { departureTime }
              onClick = { () => showDepartureTimeFunc() }
            />
          </div>
          <GenericInput
            text = { 'Description' }
            value = { departureRemarks }
            onChange = { (e) => departureRemarksFunc(e.target.value) }
          />
        {
          typeOfFlight === 'RoundTrip' &&
          <div>
            <h2 className = { 'font-size-18px font-weight-bold text-align-center' }>Select your return flight details.</h2>
            <br/>
            <div className = { 'request-grid-option' }>
              <GenericInput
                text = { 'Origin' }
                value = { returnOrigin }
                onClick = { () => returnOriginFunc() }
              />
              <GenericInput
                text = { 'Destination' }
                value = { returnDestination }
                onClick = { () => returnDestinationFunc() }
              />
            </div>
            <div className = { 'request-grid-option' }>
              <DatePicker
                readOnly
                text = { 'Preferred Date of Departure' }
                selected = { returnDate && moment(returnDate) }
                onChange = { (e) => returnDateFunc(e) }
                minDate = { moment(departureDate).add(1,'day') }
              />
              {
                showReturnTime &&
                <SingleInputModal
                  label = { 'Preferred Time' }
                  inputArray = { timeArray }
                  selectedArray = { ( returnTimeId, returnTime ) =>
                    showReturnTimeFunc(returnTimeId, returnTime)
                  }
                  onClose = { () => onClose() }
                />
              }
              <GenericInput
                text = { 'Preferred Time' }
                value = { returnTime }
                  onClick = { () => returnTimeFunc() }
              />
            </div>
            <GenericInput
              text = { 'Description' }
              value = { returnRemarks }
              onChange = { (e) => returnRemarksFunc(e.target.value) }
            />
            </div>
          }
            <center>
              <GenericButton
                text = { 'Continue' }
                onClick = { () => submit()
                }
              />
            </center>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

RequestFlightFormComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default RequestFlightFormComponent
