import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, CircularLoader, GenericButton } from '../../../ub-components/'

import './styles/navigation-modal.css'

class NavigationViewModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDismisable : true,
      showCircularLoader : false
    }
  }

  render () {
    const {
      onClose,
      logout
    } = this.props

    const {
      isDismisable,
      showCircularLoader
    } = this.state

    return (
      <Modal>
        {
          showCircularLoader ?
            <center>
              <h3>Please wait while we're logging you out</h3>
              <br/>
              <br/>
              <CircularLoader show={true}/>
              <br/>
              <br/>
            </center>          :
          <div>
            <center>
              <h3>Are you sure you want to Log out?</h3>
            </center>
            <br/>
            <br/>
            <div className = {'logout-modal-function'}>
              <GenericButton text= "Cancel"
                onClick={ () => onClose() }
               />
              <GenericButton text= "Log Out"
                onClick={ () => (logout() , this.setState({ showCircularLoader: true, isDismisable: false })) }
              />
            </div>
            <br/>
            <br/>
          </div>
        }

      </Modal>
    )
  }
}

NavigationViewModal.propTypes = {
  logout : PropTypes.func,
  onClose : PropTypes.func
}

export default NavigationViewModal
