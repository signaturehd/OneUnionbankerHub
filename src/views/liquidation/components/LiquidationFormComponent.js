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
  Modal,
  DatePicker,
}  from '../../../ub-components/'
import moment from 'moment'
import './styles/liquidationStyles.css'

class LiquidationFormComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      costTicket,
      costServiceCharge,
      showTicketModal,
      showNoticeResponseModal,
      noticeResponse,
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
      travelGroupArray,
      showTravelGroupFunc,
      showTravelGroup,
      travelGroupId,
      travelGroup,
      travelGroupHeadFunc,
      attachmentsData,
      submitFunc,
      attachmentsDataFunc,

      onClose,
      ticketMode,
      backToList,
      liquidationServiceCharge,
      liquidationCost,
      liquidationVAT,
      orDate,
      orDateFunc,
      orNumber,
      orNumberFunc,
      ticketReasons,
      ticketReasonsFunc
    } = this.props

    const depTime = departureDate + " " + departureTime
    const retTime = returnDate + " " + returnTime

    const totalAmount = parseInt(liquidationCost) + parseInt(liquidationServiceCharge) + parseInt(liquidationVAT)

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
            text = { moment(departureDate.replace('Z' , '')).format('MMM DD YYYY') }
            type = { 'time' }
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
              value = { format(liquidationCost) }
            />
            <GenericInput
              text = { 'Total Service Charge' }
              value = { format(liquidationServiceCharge) }
            />
          </div>
          <div>
            <GenericInput
              text = { 'Value-Added Tax' }
              value = { format(liquidationVAT) }
            />
            <GenericInput
              text = { 'Total Amount' }
              disabled = { true }
              value = { format(totalAmount) }
            />
          </div>
        </div>
        <GenericInput
          text = { 'Official Receipt Number' }
          value = { orNumber }
          onChange = { (e) => orNumberFunc(e.target.value) }
          maxLength = { 20 }
        />
        <DatePicker
          selected = { orDate }
          onChange = { (e) => orDateFunc(e) }
          maxDate = { moment() }
          readOnly
          dateFormat = { 'MM/DD/YYYY'  }
          text = { 'Date of Official Receipt' }
          errorMessage = { '' }
          />
        {
          ticketMode === 1 ?
          <MultipleAttachments
            placeholder = { 'Form Attachments' }
            fileArray = { attachmentsData  }
            setFile = { (attachmentsData) => attachmentsDataFunc(attachmentsData) }
          />
          :
          <GenericInput
            text = { 'Why the ticket was unused' }
            value = { ticketReasons }
            onChange = { (e) => ticketReasonsFunc(e.target.value) }
          />
        }

        <center className = { 'grid-global' }>
          <GenericButton
            text = { 'Cancel' }
            onClick = { () => backToList() }
          />
          <GenericButton
            text = { 'Continue' }
            onClick = { () => submitFunc() }
          />
        </center>
      </div>
      <div></div>
      </div>
    )
  }
}

export default LiquidationFormComponent
