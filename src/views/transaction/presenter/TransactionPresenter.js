import TransactionsInteractor from '../../../domain/interactor/transactions/TransactionsInteractor'
import TransactionIdInteractor from '../../../domain/interactor/transactions/TransactionIdInteractor'
import GetTransactionParam from '../../../domain/param/GetTransactionParam'

export default class TransactionPresenter {
  constructor (container) {
    this.TransactionsInteractor = new TransactionsInteractor(container.get('HRBenefitsClient'))
    this.TransactionIdInteractor= new TransactionIdInteractor(container.get('HRBenefitsClient'))
 
  }

  setView (view) {
    this.view = view
  }

  getTransactions () {
    this.view.showLoading()
    this.TransactionsInteractor.execute()
      .subscribe(transactions => {
          this.view.hideLoading()
          this.view.showTransactions(transactions)
      }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
      })
  }

getTransactionId(id) {
    this.view.showLoading()
    this.TransactionIdInteractor.execute(GetTransactionParam(id))
      .subscribe(transactionId => {
          this.view.hideLoading()
          this.view.showTransactionId(transactionId)
      }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
      })
  }

}
