import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Modal, GenericButton } from '../../../ub-components'

import './styles/educationModalStyle.css'

class GrantTypesModal extends Component {
  constructor (props) {
    super(props)
  }

  // setFileAttachment (data) {
  //   let attachmentArray = []
  //
  //   data &&
  //   data.map((attachment, key) => {
  //     attachmentArray.push({
  //       name : attachment
  //     })
  //   })
  //
  //   return attachmentArray
  // }

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
                onClick = { () => selectedArray(inputs.id, inputs.name, inputs.amount, inputs.attachments) }
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

GrantTypesModal.propTypes = {
  label : PropTypes.string,
  onClose : PropTypes.func,
  selectedArray : PropTypes.func,
  inputArray : PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        attachment : PropTypes.array,
        amount : PropTypes.string,
        name : PropTypes.string,
        id : PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    )
  )
}

GrantTypesModal.defaultProps = {
  label : 'Types of Grant',
  inputArray : [],
}

export default GrantTypesModal
