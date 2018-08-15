import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Modal, GenericButton } from '../../../ub-components'

import './styles/maternityModalStyle.css'

class MaternityTypeOfDeliveryModals extends Component {
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
          className = { 'maternity-select-grid' }
        >

        {
          inputArray.length !== 0 &&
          inputArray.map((inputs, key) => (
            <div>
              <GenericButton
                className = { 'maternity-input-modal-button' }
                key = { key }
                className = { 'maternity-select-button' }
                onClick = { () => selectedArray(inputs.id, inputs.name, inputs.limit) }
                text = { inputs.name }
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

MaternityTypeOfDeliveryModals.propTypes = {
  label : PropTypes.string,
  onClose : PropTypes.func,
  selectedArray : PropTypes.func,
  inputArray : PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        name : PropTypes.string,
        id : PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    )
  ),
}

MaternityTypeOfDeliveryModals.defaultProps = {
  label : 'Type Of Delivery',
  inputArray : [],
}

export default MaternityTypeOfDeliveryModals
