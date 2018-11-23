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
      showFormFunc
    } = this.props
    return (
      <div className = { 'card-grid' }>
        <div></div>
        <div>
          <DatePicker
          text = { 'Preferred Date' }/>
          <GenericInput
          text = { 'Preferred Time' }
          type = { 'time' }/>
          <GenericInput
          text = { 'Description' }
          type = { 'textarea' }/>
          <div className = { 'grid-global' }>
            <GenericButton
            text = { 'Cancel' }/>
            <GenericButton
            text = { 'Submit' }/>
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
