import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../../ub-components/'
import ConnectView from '../../../utils/ConnectView'
import Presenter from '../presenter/TransactionPresenter'
import BaseMVPView from '../../common/base/BaseMVPView'

import './styles.css'

class TransactionModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state={
    transactionID: []

  }
}

 componentDidMount () {
    this.presenter.getTransactionId(this.props.details)

  }
   showTransactions(transactions){
    this.setState({transactions})
  }

    getTransactionId(id){
  this.props.presenter.getTransactionId(id)
    }

   showTransactionId(transactionsID){
      this.setState({transactionsID})
    }
  


  render () {
    const { onClose, details, detail, transactions,transactionsID} = this.props
   console.log(transactionsID)

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
      <div>
          </div>
          <div>
       
              <h4>Title: {transactionsid && transactionsid.transactionsid && transactionsid.dateFiled}</h4>

          }
          }
          }

                    
                  
        </div>
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
  detail: PropTypes.object,

}

export default ConnectView (TransactionModal, Presenter)
