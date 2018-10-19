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
      schoolPageNumber,
      className,
      selectedArray,
      schoolViewMore,
      nextSchoolPageNumberFunc,
      previousSchoolPageNumberFunc,
      schoolFindFunc
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
          onChange = { (e) => schoolFindFunc(e.target.value) }
        />
        {
          enabledLoader ?
          <center>
            <CircularLoader show = { enabledLoader } />
          </center>
          :
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
        <div className = { 'school-modal-grid text-align-center' }>
          {
            schoolPageNumber !== 1 &&
            <GenericButton
              text = { 'Previous' }
              type = { 'button' }
              onClick = { () => previousSchoolPageNumberFunc() }
            />
          }
          <GenericButton
            text = { 'Next' }
            type = { 'button' }
            onClick = { () => nextSchoolPageNumberFunc() }
          />
        </div>
        </div>
      </Modal>
    )
  }
}

AreaModal.propTypes = {
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

AreaModal.defaultProps = {
  label : 'School',
  inputArray : [],
}

export default AreaModal
