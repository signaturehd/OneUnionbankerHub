import GetTransactionApprovalInteractor from '../../../domain/interactor/transactions/GetTransactionApprovalInteractor'
import GetTransactionPersonalInteractor from '../../../domain/interactor/transactions/GetTransactionPersonalInteractor'
import GetTransactionDetailsInteractor from '../../../domain/interactor/transactions/GetTransactionDetailsInteractor'

import GetTransactionParam from '../../../domain/param/GetTransactionParam'

export default class TransactionPresenter {
  constructor (container) {
    this.getTransactionApprovalInteractor = new GetTransactionApprovalInteractor(container.get('HRBenefitsClient'))
    this.getTransactionPersonalInteractor = new GetTransactionPersonalInteractor(container.get('HRBenefitsClient'))
    this.getTransactionDetailsInteractor = new GetTransactionDetailsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getTransactionsPersonal () {
    this.getTransactionPersonalInteractor.execute()
      .subscribe(transactions => {
          this.view.transactions(transactions)
        }, e => {
          this.view.hideLoading()
      })
  }

  getTransactionsApproval () {
    this.getTransactionApprovalInteractor.execute()
      .subscribe(transactions => {
          this.view.transactions(transactions)
        }, e => {
          this.view.hideLoading()
      })
  }

  getTransactionDetails (id) {
    this.getTransactionDetailsInteractor.execute(GetTransactionParam(id))
      .subscribe(transactionResponse => {
          this.view.transacitonDetails(transactionResponse)
        }, e => {
          this.view.hideLoading()
      })
  }

}
