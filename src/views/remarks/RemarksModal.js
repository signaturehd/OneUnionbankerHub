import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/TransactionPresenter'
import ConnectPartial from '../../utils/ConnectPartial'

import { Modal } from '../../../ub-components'

class RemarksModal extends Component {
  constructor (props) {
    super(props)
  }

  getRemarks () {
    this.presenter.getRemarks(id)
  }

  render () {
    const { onClose } = this.props

    return(
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >

      </Modal>
    )
  }
}

RemarksModal.propTypes = {
  onClose : PropTypes.func
}

export default ConnectPartial(RemarksModal, Presenter)
