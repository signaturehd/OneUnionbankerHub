import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Modal, GenericButton } from '../../../ub-components'

import './styles/educationGroupAidModalStyle.css'

class DurationOfPremium extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      inputArray,
      onClose,
      label,
      className,
      selectedArray,
    } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        <center>
          <h2>{label}</h2>
        </center>
        <br/>
        <div
          className = { 'select-grid' }
        >

        {
          inputArray.length !== 0 &&
          inputArray.map((inputs, key) => (
            <div>
              <GenericButton
                className = { 'educ-modal-button' }
                key = { key }
                className = { 'select-button' }
                onClick = { () => selectedArray(inputs.id, inputs.months, inputs.paymentDuration) }
                text = { inputs.paymentDuration }
              />
              <br/>
            </div>
          ))
        }
        </div>
      </Modal>
    )
  }
}

DurationOfPremium.propTypes = {
  label : PropTypes.string,
  onClose : PropTypes.func,
  selectedArray : PropTypes.func,
  inputArray : PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        months : PropTypes.string,
        paymentDuration : PropTypes.string,
        id : PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    )
  ),
}

DurationOfPremium.defaultProps = {
  label : 'Duration Of Premium',
  inputArray : [],
}

export default DurationOfPremium
