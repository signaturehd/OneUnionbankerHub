import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/TermsPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'


import {
  GenericTextBox,
  GenericButton,
  Modal,
  CircularLoader
} from '../../ub-components'

class TermsModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      disableSubmit : false,
      text : null,
    }
  }

  disagreeTerms () {
    const { onClose } = this.props
    onClose()
  }

  render () {
    const { onClose, terms } = this.props
    const { disableSubmit, text } = this.state
    return (
      <Modal
        isDismisable = {false}
        onClose = { onClose }
      >
      {
        disableSubmit ?
        <center>
          <h3>{ text }</h3>
          <br/>
          <br/>
          <CircularLoader show={true}/>
        </center>        :
        <div>
          <div dangerouslySetInnerHTML = {{ __html: terms }}/>
          <br/>
          <br/>
          <GenericButton text= "Agree"
            onClick={ () => {
                this.setState({ disableSubmit : true, text : `Please wait while we're submitting your Response` })
                this.presenter.agreeTerms()
              }
            }
            disabled = {disableSubmit}
           />
          <GenericButton text= "Disagree"
            onClick={ () => this.disagreeTerms() }
            disabled = {disableSubmit}
          />
        </div>
      }
      </Modal>
    )
  }
}

export default ConnectView(TermsModal, Presenter)
