import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import {
  Card,
  Line,
  GenericButton,
  GenericInput,
  MultipleAttachments,
  SingleInputModal,
  Modal
}  from '../../../ub-components/'
import moment from 'moment'
import './styles/bookflightStyles.css'

class BookFlightFormComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      showTicketModal,
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
      departureDate,
      departureTime,
      departureTimeFunc,
      returnDate,
      returnTime,
      returnTimeFunc,
      totalCostOfFlight,
      totalCostOfFlightFunc,
      totalServiceCharge,
      totalServiceChargeFunc,
      valueAddedTax,
      valueAddedTaxFunc,
      totalAmount,
      bookflightArray,
      travelGroupArray,
      showTravelGroupFunc,
      showTravelGroup,
      travelGroupId,
      travelGroup,
      travelGroupHeadFunc,
      onClose,
      attachmentsData,
      attachmentsData2,
      showEditButton,
      showEditButtonFunc,
      submitForm,
      submitFormFunc,
      submitFunc,
    } = this.props

    const depTime = departureDate + " " + departureTime
    const retTime = returnDate + " " + returnTime

    return (
      <div className = { 'card-grid' }>
      <div></div>
      <div>
        <h2 className = { 'font-size-20px font-weight-bold text-align-center' }>{ `${purposeName}-${rturn}` }</h2>
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
                <h2 className = { 'font-size-14px font-weight-bold' }>{ returnOrigin }</h2>
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
        {
          showTravelGroup &&
          <SingleInputModal
            label = { 'Group Heads' }
            inputArray = { travelGroupArray }
            selectedArray = { (travelGroupId, travelGroup) =>
              travelGroupHeadFunc(travelGroupId, travelGroup)
            }
            onClose = { () => onClose() }
          />
        }
        <div className = { 'grid-global' }>
          <div>
          <h2>DEPARTURE</h2>
          <GenericInput
            text = { departureDate }
            type = { 'time' }
            disabled = { showEditButton }
            value = { departureTime }
            onChange = { (e) => departureTimeFunc(e.target.value) }
          />
          </div>
          {
            rturn === 'RoundTrip' &&
            <div>
            <h2>RETURN</h2>
            <GenericInput
              text = { returnDate }
              type = { 'time' }
              disabled = { showEditButton }
              disabled = { showEditButton }
              value = { returnTime }
              onChange = { (e) => returnTimeFunc(e.target.value) }
            />
            </div>
          }
        </div>
        <div className = { 'grid-global' }>
          <div>
            <GenericInput
              text = { 'Total Cost of Flight' }
              type = { 'number' }
              disabled = { showEditButton }
              value = { totalCostOfFlight == 0 ? '' : totalCostOfFlight }
              onChange = { (e) => totalCostOfFlightFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Total Service Charge' }
              type = { 'number' }
              disabled = { showEditButton }
              value = { totalServiceCharge == 0 ? '' : totalServiceCharge }
              onChange = { (e) => totalServiceChargeFunc(e.target.value) }
            />
            {
              totalAmount >= '50000' &&
              <GenericInput
                text = { 'Group Heads' }
                value = { travelGroup }
                onClick = { () => showTravelGroupFunc() }
              />
            }
          </div>
          <div>
            <GenericInput
              text = { 'Value-Added Tax' }
              type = { 'number' }
              disabled = { showEditButton }
              value = { valueAddedTax === 0 ? '' : valueAddedTax }
              onChange = { (e) => valueAddedTaxFunc(e.target.value) }
            />
            <GenericInput
              text = { 'Total Amount' }
              disabled = { true }
              value = { totalAmount ? totalAmount.toLocaleString() : 0 }
            />
          </div>
        </div>
        {
          isDomestic ?
          <MultipleAttachments
            placeholder = { 'Form Attachments' }
            fileArray = { attachmentsData }
            disabled = { showEditButton }
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
          {
            showEditButton ?
            <center>
              <br/>
              <Line/>
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'Edit'  }
                  className = { 'profile-button-medium' }
                  onClick = { () => showEditButtonFunc(false) }
                  />
                <GenericButton
                  text = { 'Submit'  }
                  className = { 'profile-button-medium' }
                  onClick = { () => submitFormFunc() }
                  />
              </div>
            </center> :
            <GenericButton
              text = { 'Continue' }
              onClick = { () => submitFunc() }
            />
          }
        </center>
      </div>
      <div></div>
      </div>
    )
  }
}

export default BookFlightFormComponent
