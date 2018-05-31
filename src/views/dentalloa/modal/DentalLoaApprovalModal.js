import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal , GenericButton } from '../../../ub-components/'

class DentalLoaApprovalModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDismisable : true
    }
  }

  render () {
  const {
    noticeRespForm,
    onClose,
    isDismisable,
    agree,
    disagree } = this.props
  return (
    <Modal
      onClose = { onClose }
      isDismisable = { isDismisable } >
      <div className = { 'optical-modal-footer' }>
        {
            noticeRespForm && noticeRespForm.forms.map((form) =>
            <div>
              <div dangerouslySetInnerHTML = {{ __html : form.form }} />
            </div>
          )
        }
        <GenericButton text = { agree } />
        <GenericButton text = { disagree } />
      </div>
    </Modal>
    )
  }
}
DentalLoaApprovalModal.propTypes = {
  onClose : PropTypes.func,
  noticeRespForm : PropTypes.array,
  agree : PropTypes.string,
  disagree : PropTypes.string,
}
DentalLoaApprovalModal.defaultProps ={
  agree : 'AGREE',
  disagree : 'DISAGREE'
}
export default DentalLoaApprovalModal
