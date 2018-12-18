import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Modal, GenericButton } from '../../../ub-components'

import './styles/vaccinesStyle.css'

class VaccinesModal extends Component {
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
                className = { 'vaccine-modal-button' }
                key = { key }
                className = { 'select-button' }
                onClick = { () => selectedArray(inputs.id, inputs.name,
                inputs.orderingStart, inputs.orderingEnd, inputs.cost) }
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

VaccinesModal.propTypes = {
  label : PropTypes.string,
  onClose : PropTypes.func,
  selectedArray : PropTypes.func,
  inputArray : PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        orderingStart : PropTypes.string,
        orderingEnd : PropTypes.string,
        orderingCost : PropTypes.string,
        name : PropTypes.string,
        id : PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    )
  ),
}

VaccinesModal.defaultProps = {
  label : 'Vaccines',
  inputArray : [],
}

export default VaccinesModal
