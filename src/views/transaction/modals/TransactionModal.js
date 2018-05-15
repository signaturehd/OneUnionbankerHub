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
    transactionId : [],
    transactions: []

  }
}

 componentDidMount () {
    this.presenter.getTransactionId()
     
  }
   showTransactions(transactions){
    this.setState({transactions})
  }

    getTransactionId(id){
  this.props.presenter.getTransactionId(id)
    }


  


  render () {
    const { onClose, details, detail, transactions,transactionId} = this.props
    console.log(transactions)

   

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
      <div>
          </div>
          <div>
           
              <h4>Title: {detail && detail.transactions && transactions.id}</h4>

             

                    
                  
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
