import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Modal, GenericButton } from '../../../../ub-components'

class SchoolModal extends Component {
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
      schoolViewMore,
      schoolPageNumberFunc
    } = this.props

    const isVisible = (inputArray && inputArray.length > 4) ? '' : 'hide'
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
                className = { 'single-input-modal-button' }
                key = { key }
                className = { 'select-button' }
                onClick = { () => selectedArray(inputs.id, inputs.name) }
                text = { inputs.name }
              />
              <br/>
            </div>
          ))
        }
        <div>
          <button
            type = { 'button' }
            className = { `viewmore tooltip ${ isVisible }` }
            onClick = { () => schoolPageNumberFunc() }>
            <img src={ require('../../../../images/icons/horizontal.png') } />
            <span className={ 'tooltiptext' }>{ schoolViewMore }</span>
          </button>
        </div>
        </div>
      </Modal>
    )
  }
}

SchoolModal.propTypes = {
  label : PropTypes.string,
  schoolPageNumberFunc : PropTypes.func,
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

SchoolModal.defaultProps = {
  label : 'School',
  inputArray : [],
}

export default SchoolModal
