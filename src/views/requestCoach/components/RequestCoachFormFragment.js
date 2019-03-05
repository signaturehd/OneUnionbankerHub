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
      preferredTimeErrorMessage,
      onClose,
      onSubmit
    } = this.props

    const minimumDate = '01/01/'+new Date().getFullYear()
    const maximumDate = '12/31/'+new Date().getFullYear()

    return (
      <div className = { 'card-grid-column' }>
        <div></div>
        <div>
          <div className = { 'grid-global' }>
            <DatePicker
              text = { 'Preferred Date' }
              selected = { preferredDate && moment(preferredDate) }
              onChange = { (e) => preferredDateFunc(e) }
              minDate = { moment() }
              maxDate = { moment(maximumDate) }
            />
            <GenericInput
              text = { 'Preferred Time' }
              type = { 'time' }
              value = { preferredTime }
              min = { moment().format('hh:mm:ss A') }
              onChange = { (e) => preferredTimeFunc(e.target.value) }
              errorMessage = { preferredTimeErrorMessage }
            />
          </div>
          <div className = { 'grid-global' }>
            <GenericInput
              text = { 'Description' }
              type = { 'textarea' }
              value = { description }
              onChange = { (e) => descriptionFunc(e.target.value) }
            />
            <div></div>
          </div>
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
