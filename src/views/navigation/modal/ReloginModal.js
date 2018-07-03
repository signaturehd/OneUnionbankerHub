import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components/'

import './styles/navigation-modal.css'

class ReloginModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      relogin,
    } = this.props

    return (
      <Modal
        isDismisable = { false }
      >
        <div>
          <center>
            <h3>Your current Session is Expired, please re login</h3>
          </center>
          <br/>
          <br/>
          <div className = {'logout-modal-function'}>
            <span></span>
            <GenericButton text= "OK"
              onClick={ () => (relogin())}
            />
          </div>
          <br/>
          <br/>
        </div>
      </Modal>
    )
  }
}

ReloginModal.propTypes = {
  relogin : PropTypes.func,
}

export default ReloginModal
