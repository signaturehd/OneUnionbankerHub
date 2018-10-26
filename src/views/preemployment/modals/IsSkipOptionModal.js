import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
} from '../../../ub-components/'


class IsSkipOptionModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onSendPageNumberToView } = this.props

    return(
      <Modal>
        <h2 className = { 'font-weight-bold font-size-20px' }></h2>
        <br/>
        <h2>Do you want to skip this form? You still haven\'t saved your data.</h2>
        <br/>
        <div className = { 'grid-global ' }>
          <GenericButton
            className = { 'global-button' }
            text = { 'No' }
            onClick = { () => onSendPageNumberToView(15) }
            />
          <GenericButton
            onClick = { () => onSendPageNumberToView(16) }
            className = { 'global-button' }
            text = { 'Yes' }
            />
        </div>
    </Modal>
    )
  }
}

IsSkipOptionModal.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default IsSkipOptionModal
