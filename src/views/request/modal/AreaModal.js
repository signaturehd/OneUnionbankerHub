import React, { Component } from 'react'

import PropTypes from 'prop-types'
import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput
} from '../../../ub-components'

class AreaModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      inputArray,
      onClose,
      enabledLoader,
      label,
      pageNumber,
      className,
      selectedArray,
      nextPageNumberFunc,
      previousPageNumberFunc,
      findFunc
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
        <div className = { 'select-grid' }>
        <GenericInput
          text = { 'Search' }
          onChange = { (e) => findFunc(e.target.value) }
        />
        {
          enabledLoader ?
          <center>
            <CircularLoader show = { enabledLoader } />
          </center>
          :
          inputArray.length !== 0 &&
          inputArray.areaLists.map((inputs, key) => (
            <div>
              <GenericButton
                className = { 'single-input-modal-button' }
                key = { key }
                className = { 'select-button' }
                onClick = { () => selectedArray(inputs.id, inputs.location) }
                text = { inputs.location }
              />
              <br/>
            </div>
          ))
        }
        <div className = { 'school-modal-grid text-align-center' }>
          {
            pageNumber !== 1 &&
            <GenericButton
              text = { 'Previous' }
              type = { 'button' }
              onClick = { () => previousPageNumberFunc(pageNumber) }
            />
          }
          <GenericButton
            text = { 'Next' }
            type = { 'button' }
            onClick = { () => nextPageNumberFunc(pageNumber) }
          />
        </div>
        </div>
      </Modal>
    )
  }
}

AreaModal.propTypes = {
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

AreaModal.defaultProps = {
  label : 'Area',
  inputArray : [],
}

export default AreaModal
