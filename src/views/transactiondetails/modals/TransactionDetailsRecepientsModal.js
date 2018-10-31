import React, { Component }  from 'react'
import PropTypes from 'prop-types'

import { Modal, List } from '../../../ub-components'

class TransactionDetailsRecepientsModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClose, recepients } = this.props
  return (
    <Modal
      isDismisable = { true }
      width = { 50 }
      onClose = { onClose }
    >
      <h2 className = { 'text-align-center' } >Vaccine Details</h2>
      <br/>
      <div>
        {
          recepients &&
          recepients.map((recepient, key) => (
            <div>
              <br/>
              <List
                description = {'Vaccine: '+ recepient.Name + ' - Amount: ' + recepient.Cost + ', Quantity: ' + recepient.Quantity}
                title = { recepient.Status }
              />
              <br/>
            </div>

          ))
        }
      </div>
    </Modal>
    )
  }
}

TransactionDetailsRecepientsModal.propTypes = {
  onClose: PropTypes.func,
  recepients: PropTypes.array,
}

export default TransactionDetailsRecepientsModal
