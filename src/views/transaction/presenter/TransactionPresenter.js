import TransactionsInteractor from '../../../domain/interactor/transactions/TransactionsInteractor'
import TransactionIdInteractor from '../../../domain/interactor/transactions/TransactionIdInteractor'
import GetTransactionParam from '../../../domain/param/GetTransactionParam'

export default class TransactionPresenter {
  constructor (container) {
    this.TransactionsInteractor = new TransactionsInteractor(container.get('HRBenefitsClient'))
    this.TransactionIdInteractor= new TransactionIdInteractor(container.get('HRBenefitsClient'))
    this.GetTransactionParam=new GetTransactionParam(container.get('HRBenefitsClient'))

 
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
      })
  }

getTransactionId(id) {

    this.view.showLoading()
    console.log(this.view)
    this.TransactionIdInteractor.execute(GetTransactionParam(id))

      .subscribe(transactionId => {
    console.log(transactionID)
        
          this.view.hideLoading()
          this.view.showTransactionId(transactionID)
      }, e => {
          this.view.hideLoading()
      })
  }

}
