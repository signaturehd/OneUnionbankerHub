import GetTransactionDetailsInteractor from '../../../domain/interactor/transactions/GetTransactionDetailsInteractor'

import GetTransactionParam from '../../../domain/param/GetTransactionParam'

export default class TransactionPresenter {
  constructor (container) {
    this.getTransactionDetailsInteractor =
      new GetTransactionDetailsInteractor(container.get('HRBenefitsClient'))
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

}
