import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericButton, Modal, Line } from '../../../ub-components/'
import './styles/trainingCardStyles.css'
import moment from 'moment'

export default class ApprovalTrainingModal extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      onClose,
      details,
      showApproveModal,
      showRejectModal,
    } = this.props

    const dateRequired = moment(details.training.endDate).diff(details.training.startDate, 'days')
    let dayDuration = parseInt(dateRequired) * parseInt(details.training.duration)

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        width = { 50 }>
        <div>
          <div>
            <h3>{ details.employeeName }</h3>
            <br/>
            <Line />
          </div>
          <div className={ 'training-grid-2' }>
            <div className={ 'training-components' }>
              <h4>Training Details</h4>
              <p>Title : { details.training.title }</p>
              <p>Description : { details.training.description }</p>
              <br/>
              <h4>Venue Details</h4>
              <p>Venue : { details.training.venue }</p>
              <p>Status : { details.training.status }</p>
              <br/>
            </div>
            <div className={ 'training-components' }>
              <h4>Facilitator Details</h4>
              <p>Name : { details.training.facilitator.firstName } { details.training.facilitator.middleName } { details.training.facilitator.lastName } { details.training.facilitator.suffix }</p>
              <p>Email : { details.training.facilitator.email }</p>
              <br/>
              <h4>Date and Time</h4>
              <p>Date : { details.training.startDate } - { details.training.endDate }</p>
              <p>Time : { details.training.startTime } - { details.training.endTime }</p>
              <p>Duration : { dayDuration} hrs</p>
            </div>
          </div>
          <br/>
          <div className={ 'button-grid-2' }>
            <GenericButton
              text = { 'Approve' }
              className = { 'approve-button' }
              onClick = { () => showApproveModal(true) }
              />
            <GenericButton
              text = { 'Reject' }
              className = { 'reject-button' }
              onClick = { () => showRejectModal(true) }
              />
          </div>
        </div>
      </Modal>
    )
  }
}
