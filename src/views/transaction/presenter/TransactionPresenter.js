import TransactionsInteractor from '../../../domain/interactor/transactions/TransactionsInteractor'
export default class TransactionPresenter {
  constructor (container) {
    this.TransactionsInteractor = new TransactionsInteractor(container.get('HRBenefitsClient'))
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
}
