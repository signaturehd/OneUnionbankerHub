import GetTransactionInteractor from '../../../domain/interactor/transactions/GetTransactionInteractor'
import GetTransactionByIdInteractor from '../../../domain/interactor/transactions/GetTransactionByIdInteractor'
import GetTransactionParam from '../../../domain/param/GetTransactionParam'

export default class TransactionPresenter {
  constructor (container) {
    this.getTransactionInteractor = new GetTransactionInteractor(container.get('HRBenefitsClient'))
    this.getTransactionByIdInteractor = new GetTransactionByIdInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getTransactions () {
    this.view.showLoading()
    this.getTransactionInteractor.execute()
      .subscribe(transactions => {
          this.view.hideLoading()
          this.view.transactions(transactions)
        }, e => {
          this.view.hideLoading()
      })
  }

  getTransactionById (id) {
    this.view.showLoading()
    this.getTransactionByIdInteractor.execute(GetTransactionParam(id))
      .subscribe(transactionResponse => {
          this.view.hideLoading()
          this.view.transacitonDetails(transactionResponse)
          console.log(transactionResponse)
        }, e => {
          this.view.hideLoading()
      })
  }

}
