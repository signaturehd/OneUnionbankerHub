import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Modal, GenericButton } from '../../../ub-components'

import './styles/educationGroupAidModalStyle.css'

class DependentsModal extends Component {
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
                onClick = { () => selectedArray(inputs.id, inputs.name, inputs.months) }
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

DependentsModal.propTypes = {
  label : PropTypes.string,
  onClose : PropTypes.func,
  selectedArray : PropTypes.func,
  inputArray : PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        months : PropTypes.string,
        name : PropTypes.string,
        id : PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    )
  ),
}

DependentsModal.defaultProps = {
  label : 'Dependent Modal',
  inputArray : [],
}

export default DependentsModal
