import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { GenericButton, GenericTextBox, CircularLoader } from '../../../ub-components'

import Modal from '../../../ub-components/Modal/Modal'

import './styles/modalStyle.css'

class ReleasingCenterModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      onSubmit,
      type,
      placeholder,
      onClick,
      releasingCenters,
    } = this.props

    return (
      <Modal
        onClose = { onClose }
        isDismisable = {true}>
        <div>
        {
          releasingCenters ?
          releasingCenters.map((releasingCenter, key) => ((
              <GenericButton
                className = { 'dentalloa-modal-option-button' }
                key = { key }
                onClick = { () => {
                    onClick(releasingCenter.unit), onClose()
                  }
                }
                text = { releasingCenter.unit }
              />
            ))
          )          :
          <CircularLoader
            show={true}/>
        }
        </div>
      </Modal>
    )
  }
}

ReleasingCenterModal.propTypes = {
  onClose : PropTypes.func,
  onSubmit : PropTypes.func,
  isDimissable : PropTypes.func,
  type : PropTypes.string,
  placeholder : PropTypes.string,
  onClick : PropTypes.func,
  releasingCenters :  PropTypes.array
}

export default ReleasingCenterModal
