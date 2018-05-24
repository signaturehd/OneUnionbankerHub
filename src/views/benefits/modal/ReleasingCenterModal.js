import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { GenericButton, GenericTextBox } from '../../../ub-components'

import Modal from '../../../ub-components/Modal/Modal'

class ReleasingCenterModal extends Component {
  constructor (props) {
    super(props)
  }

  renderReleasingCenter (releasingCenters) {
    return releasingCenters ?
    releasingCenters.map((releasingCenter, key) => {
      return (
        <GenericButton
          key = { key }
          text = { releasingCenter.unit }
        />
      )
    })
    :
    <div></div>

  }
  render() {
      const { onClose, type, placeholder, onSubmit, isDismisable, releasingCenters } = this.props
    return (
      <form onSubmit = {onSubmit}>
        <Modal
          onClose = {onClose}
          isDismisable = {isDismisable}>
          <div>
          { this.renderReleasingCenter(releasingCenters) }
          </div>
        </Modal>
      </form>
    )
  }
}

ReleasingCenterModal.propTypes = {
  onClose : PropTypes.func,
  onChange : PropTypes.func,
  onSubmit : PropTypes.func,
  isDimissable : PropTypes.func,
  type : PropTypes.string,
  maxLength : PropTypes.number,
  placeholder : PropTypes.string,
}

export default ReleasingCenterModal
