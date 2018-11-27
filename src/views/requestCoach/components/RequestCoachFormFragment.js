import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { GenericInput, GenericButton, DatePicker }  from '../../../ub-components/'
import moment from 'moment'
import './styles/requestCoach.css'

class RequestCoachFormFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      cardDataHolder,
      showFormFunc,
      description,
      descriptionFunc,
      preferredDate,
      preferredDateFunc,
      preferredTime,
      preferredTimeFunc,
      onClose,
      onSubmit
    } = this.props
    return (
      <div className = { 'card-grid-column' }>
        <div>
          <DatePicker
          text = { 'Preferred Date' }
          selected = { preferredDate && moment(preferredDate) }
          onChange = { (e) => preferredDateFunc(e) }
          minDate = { moment() }
          />
          <GenericInput
          text = { 'Preferred Time' }
          type = { 'time' }
          value = { preferredTime }
          onChange = { (e) => preferredTimeFunc(e.target.value) }
          />
          <GenericInput
          text = { 'Description' }
          type = { 'textarea' }
          value = { description }
          onChange = { (e) => descriptionFunc(e.target.value) }
          />
          <div className = { 'grid-global' }>
            <GenericButton
            text = { 'Cancel' }
            onClick = { () => onClose() }/>
            <GenericButton
            text = { 'Submit' }
            onClick = { () => onSubmit() }/>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

RequestCoachFormFragment.propTypes = {
  cardDataHolder : PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.shape({
          name : PropTypes.string,
          file : PropTypes.object,
          base64 : PropTypes.blob,
        })
      )
  )
}

RequestCoachFormFragment.defaultProps = {
  cardDataHolder : [],
}

export default RequestCoachFormFragment
