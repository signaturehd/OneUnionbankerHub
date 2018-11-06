import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import {
  Card,
  Line,
  GenericButton,
  GenericInput,
  Modal
}  from '../../../ub-components/'
import moment from 'moment'
import './styles/approval.css'

class ApprovalFormComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      requestId,
      firstName,
      middleName,
      lastName,
      referenceNumber,
      departureOrigin,
      departureDestination,
      departureDate,
      departureTime,
      departureRemarks,
      returnOrigin,
      returnDestination,
      returnDate,
      returnTime,
      showRejectRemarksModal,
      showRejectRemarksFunc,
      returnRemarks,
      rejectedRemarks,
      rejectedRemarksFunc,
      flightMode,
      purposeName,
      submit,
      onClose
    } = this.props

    const depTime = departureDate + " " + departureTime
    const retTime = returnDate + " " + returnTime

    return (
      <div className = { 'card-grid' }>
      <div></div>
      <Card>
        <div className = { 'grid-global padding' }>
          <div>
            <h2 className = { 'font-size-18px text-align-left font-weight-lighter' }>{referenceNumber}</h2>
            <h2 className = { 'font-size-18px text-align-left font-weight-bold' }>{lastName}, {firstName} {middleName}</h2>
          </div>
          <div>
            <h2 className = { 'font-size-16px font-weight-lighter text-align-right margin-bottom-10px' }><span className = { 'border' }>{ purposeName }</span></h2>
          </div>
        </div>
        <div className = { 'book-card-grid-option' }>
          <div>
            <h2 className = { 'font-size-18px font-weight-bold text-align-left unionbank-color' }>DEPARTURE</h2>
            <h2 className = { 'font-size-18px font-weight-bold text-align-left' }>{ departureOrigin }</h2>
            <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>{ departureDate && moment(departureDate).format('MMMM, DD YYYY') } | { moment(depTime).format('LT') }</h2>
            <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>{ departureRemarks }</h2>
          </div>
          <div className = { 'text-align-center' }>
            <h2 className = { 'book-airplane-icon' }></h2>
          </div>
          <div className = { 'padding-top-20px' }>
            <h2 className = { 'font-size-18px font-weight-bold text-align-right' }>{ departureDestination }</h2>
          </div>
        </div>
        {
          flightMode === 'RoundTrip' &&
          <div className = { 'book-card-grid-option' }>
            <div>
              <h2 className = { 'font-size-18px font-weight-bold text-align-left unionbank-color' }>RETURN</h2>
              <h2 className = { 'font-size-18px font-weight-bold text-align-left' }>{ returnOrigin }</h2>
              <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>{ returnDate && moment(returnDate).format('MMMM, DD YYYY') } | { moment(retTime).format('LT') }</h2>
              <h2 className = { 'font-size-12px font-weight-lighter text-align-left' }>{ returnRemarks }</h2>
            </div>
            <div className = { 'text-align-center' }>
              <h2 className = { 'book-airplane-icon' }></h2>
            </div>
            <div className = { 'padding-top-20px' }>
              <h2 className = { 'font-size-18px font-weight-bold text-align-right' }>{ returnDestination }</h2>
            </div>
          </div>
        }
        <Line/>
        {
          showRejectRemarksModal &&
          <Modal
          isDismisable = { true }
          onClose = { () => onClose() }>
            <GenericInput
              text = { 'Remarks' }
              value = { rejectedRemarks }
              onChange = { (e) => rejectedRemarksFunc(e.target.value) }
            />
            <center>
            <div className = { 'grid-global' }>
              <div>
                <GenericButton
                text = { 'Close' }
                onClick = { () => onClose() }/>
              </div>
              <div>
                <GenericButton
                text = { 'Submit' }
                onClick = { () => {
                  submit(requestId, 0, rejectedRemarks)
                  onClose()
                }
               }/>
              </div>
            </div>
            </center>
          </Modal>
        }
        <center>
          <div className = { 'grid-global padding' }>
            <div>
              <GenericButton
              text = { 'Reject' }
              className = { 'button-reject' }
              onClick = { () => showRejectRemarksFunc() }/>
            </div>
            <div>
              <GenericButton
              text = { 'Approve' }
              className = { 'button-approve' }
              onClick = { () => submit(requestId, 1, '') }/>
            </div>
          </div>
        </center>
      </Card>
      <div></div>
      </div>
    )
  }
}

export default ApprovalFormComponent
