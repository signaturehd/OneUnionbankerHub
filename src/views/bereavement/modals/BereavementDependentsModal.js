import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'
import './styles/bereavementModal.css'

class BereavementDependentsModal extends Component {

  constructor (props) {
    super(props)
  }
/*
  Get Dependent Data, display procedures
*/
  sendDependents (dependent) {
    this.props.chosenDependent(
      dependent.id ? dependent.id : 0,
      dependent.name ? dependent.name : '',
      dependent.relationship ? dependent.relationship : ''
    )
    this.props.onClose()
  }

  render () {
  const { onClose, showDepedents, isDismisable }=this.props
  return (
    <Modal
     onClose={ onClose }
     isDismisable={ true }
    >
      <div className={ 'dentalloa-description' }>
        <h2 className={ 'header-default-margin' }>Deceased Name</h2>
      </div>
      <div className={ 'optical-modal-footer' }>
      {
        showDepedents.map((dependent, key) =>
          <GenericButton
            key={ key }
            className={ 'dentalloa-modal-option-button' }
            text={ dependent.name }
            onClick={ () =>
              this.sendDependents(dependent)
            }
          />
        )
      }
    </div>
  </Modal>
    )
  }
}
BereavementDependentsModal.propTypes={
  onClose : PropTypes.func,
  showDepedents: PropTypes.array
}
export default BereavementDependentsModal
