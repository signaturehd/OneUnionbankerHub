import GetTransactionDetailsInteractor from '../../../domain/interactor/transactions/GetTransactionDetailsInteractor'
import GetTransactionPersonalInteractor from '../../../domain/interactor/transactions/GetTransactionPersonalInteractor'

import GetTransactionParam from '../../../domain/param/GetTransactionParam'

export default class TransactionPresenter {
  constructor (container) {
    this.getTransactionDetailsInteractor =
      new GetTransactionDetailsInteractor(container.get('HRBenefitsClient'))

    this.getTransactionPersonalInteractor =
      new GetTransactionPersonalInteractor(container.get('HRBenefitsClient'))
  }
  setView (view) {
    this.view = view
  }

  getTransactionDetails (id) {
    this.getTransactionDetailsInteractor.execute(GetTransactionParam(id))
      .subscribe(transactionResponse => {
          this.view.getTransactionDetails(transactionResponse)
        }, e => {
          this.view.hideLoading()
      })
  }
  getTransactionsPersonal () {
    this.getTransactionPersonalInteractor.execute()
      .subscribe(transactions => {
          this.view.transactions(transactions)
        }, e => {
          this.view.hideLoading()
      })
  }

}
