import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter/RemarksPresenter'
import ConnectPartial from '../../utils/ConnectPartial'


import { Modal, CircularLoader, GenericButton } from '../../ub-components/'

class DisapproveModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCircular : false,
      approve : false,
    }
    this.onNo = this.onNo.bind(this)
  }

  componentDidMount () {
    this.presenter.getRemarks(this.props.benefitId)
  }


  onNo () {
    this.setState({showCircular : true})
    this.props.onNo()
  }

  render () {
    const {
      onClose,
      onNo,
      details,
    } = this.props

    const {
      showCircular
    } = this.state

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          showCircular ?
          <center>
            <h3>Submitting Your Response</h3>
            <CircularLoader show = {true} />
          </center>
          :
          <div>
            <h3>Are you sure you want to disapprove this request?</h3>
            <GenericButton
              onClick = { () => this.onNo()  }
              text = { 'Yes' } />
            <GenericButton
              onClick = { onClose }
              text = { 'Cancel' } />
          </div>
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
