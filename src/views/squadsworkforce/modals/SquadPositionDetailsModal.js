import React, { Component } from 'react'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  Card
} from '../../../ub-components'

import PropTypes from 'prop-types'

class SquadPositionDetailsModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClose,
      vacantDetails,
      applySquadCondition,
      positionId
    } = this.props

    return (
      <Modal
        width = { 50 }
      >
        <center>
          <h4>{ positionId.name }</h4>
          <br/>
          <h4>Are you sure you want to apply to this position?</h4>
          <br/>
          <center className = { 'grid-global' }>
            <GenericButton
              text ={ 'no' }
              onClick = { () => applySquadCondition(false) }
              className = { 'global-button cursor-pointer profile-button-small' }
              />
            <GenericButton
              text ={ 'yes' }
              onClick = { () => applySquadCondition(true) }
              className = { 'global-button cursor-pointer profile-button-small' }
              />
          </center>
        </center>
      </Modal>
    )
  }
}

SquadPositionDetailsModal.propTypes = {
  vacantDetails: PropTypes.object,
  applySquadCondition: PropTypes.func,
  onClose: PropTypes.func,
}

SquadPositionDetailsModal.defaultProps = {
}

export default SquadPositionDetailsModal
