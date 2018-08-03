import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericButton, Modal, ConfirmationModal } from '../../../ub-components/'
import staticImage from '../../../images/training_img.jpg'
import './styles/trainingCardStyles.css'
import moment from 'moment'

export default class TrainingCardModal extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const { onClose, details, onEnroll, showConfirmation, setConfirmation } = this.props
    const style = {
      background : `rgba(0,0,0,0.5) url(${staticImage}) no-repeat center center`,
      backgroundSize : 'cover',
      width: '-webkit-fill-available',
    }

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        width = { 50 }>
        {
          showConfirmation &&
          <ConfirmationModal
            text = { 'Are you sure you want to enroll to this class?' }
            onYes = { () => onEnroll(details.id) }
            onClose = { () => setConfirmation(false) }
          />
        }
          <div className = { 'training-modal-container' }>
            <div style = { style }>
              <div className = { 'training-status' }>
              <p>{ details.status }</p>
              </div>
            </div>
            <div className = { 'training-grid-2' }>
              <div className={ 'training-components' }>
                <h4>Training Details</h4>
                <p>Title : { details.programTitle }</p>
                <p>Description : { details.description }</p>
                <br/>
                <h4>Location Details</h4>
                <p>Venue : { details.venue }</p>
                <br/>
              </div>
              <div className={ 'training-components' }>
                <h4>Instructor Details</h4>
                <p>Name : { details.facilitator.name }</p>
                <p>Email : { details.facilitator.email }</p>
                <br/>
                <h4>Date and Time</h4>
                <p>Date : { moment(details.startDate).format('LL') } - { moment(details.endDate).format('LL') }</p>
                <p>Time : { details.startTime } - { details.endTime }</p>
                <p>Duration : { details.duration }</p>
              </div>
            </div>
            <div className={ 'button-grid' }>
              <div></div>
              <GenericButton
                text = { 'Enroll' }
                className = { 'status-button' }
                onClick = { () => setConfirmation(false) }
              />
            </div>
          </div>
      </Modal>
    )
  }
}
