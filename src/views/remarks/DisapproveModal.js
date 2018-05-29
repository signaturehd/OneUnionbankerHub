import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/RemarksPresenter'
import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'


import { Modal, CircularLoader, GenericButton } from '../../ub-components/'

class DisapproveModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false,
      approve : false,
      remarks : null
    }
    this.onNo = this.onNo.bind(this)
  }

  componentDidMount () {
    // console.log(this.presenter)
    this.presenter.getRemarks(this.props.benefitId)
  }

  getRemarks (remarks) {
    this.setState({remarks})
  }

  onNo () {
    this.setState({showCircular : true})
    this.props.onNo()
  }

  render () {
    const {
      onClose,
      onNo,
    } = this.props

    const {
      showCircular,
      remarks
    } = this.state

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          remarks ?
            <div>Rendered</div>
              :
            <center>
              <h3>Please wait a moment</h3>
              <CircularLoader show = {true} />
            </center>

        }

      </Modal>
    )
  }
}

DisapproveModal.propTypes = {
  onNo : PropTypes.func,
  onClose : PropTypes.func,
}

DisapproveModal.defaultProps = {

}

export default ConnectPartial(DisapproveModal, Presenter)
