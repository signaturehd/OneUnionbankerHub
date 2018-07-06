import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/calamityModalStyle.css'

class CalamityModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calamityAssistance: [],
      enabledLoader : false
    }
  }

  showLoader () {
    this.setState({ enabledLoader : true })
  }

  hideLoader () {
    this.setState({ enabledLoader : false })
  }

  onGetClicked (id, description) {
    this.props.onSubmit(id, description)
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
            Types of Calamity
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
                () => this.onGetClicked(resp.id, resp.description)
              }
              />
            )
          }
        </div>
      </Modal>
    )
  }
}

CalamityModal.propTypes = {
    onClose : PropTypes.func,
    tog : PropTypes.object,
    onSubmit : PropTypes.func,
}

export default CalamityModal
