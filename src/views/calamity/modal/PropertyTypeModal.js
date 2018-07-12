import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/calamityModalStyle.css'

class PropertyTypeModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false
    }
  }

  showLoader () {
    this.setState({ enabledLoader : true })
  }

  hideLoader () {
    this.setState({ enabledLoader : false })
  }

  onGetClicked (description) {
    this.props.onSubmit(description)
    this.props.onClose()
  }

  render () {
    const { onClose, tog } = this.props
    const { enabledLoader} = this.state
    return (
      <Modal
        onClose = { onClose }
        isDismisable = { true }>
        <center>
          <h2>
            Property Types
          </h2>
        </center>
        <div>
          {
            enabledLoader ?
             <center>
               <CircularLoader show = { this.state.enabledLoader }/>
             </center> :
            tog &&
            tog.map((resp, key) =>
            <GenericButton
              className = { 'calamity-tog-modal-button' }
              key = { key }
              text = { resp && resp.description }
              onClick = {
                () => this.onGetClicked(resp.description)
              }
              />
            )
          }
        </div>
      </Modal>
    )
  }
}

PropertyTypeModal.propTypes = {
    onClose : PropTypes.func,
    tog : PropTypes.object,
    onSubmit : PropTypes.func,
}

export default PropertyTypeModal
