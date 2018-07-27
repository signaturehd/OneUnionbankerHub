import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton
} from '../../../ub-components/'

import './styles/outPatientModalStyle.css'

import BaseMVPView from '../../common/base/BaseMVPView'

class OutPatientDependentModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const {
    listDependents,
    selectedDependent,
    onClose
  } = this.props

  return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          listDependents ?

          listDependents && listDependents.map((resp, key) => {
          <GenericButton
            key = { key }
            className = { 'outpatient-modal-dependent-button' }
            text = { resp.name }
            onClick = { () => selectedDependent(resp) }
            />
          })
          :
          <div></div>
        }
      </Modal>
    )
  }
}
OutPatientDependentModal.propTypes = {
  onClose : PropTypes.func,
  listDependents : PropTypes.array
}
OutPatientDependentModal.defaultProps = {
}
export default OutPatientDependentModal
