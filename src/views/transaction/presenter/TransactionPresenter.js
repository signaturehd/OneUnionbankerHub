import GetTransactionApprovalInteractor from '../../../domain/interactor/transactions/GetTransactionApprovalInteractor'
import GetTransactionPersonalInteractor from '../../../domain/interactor/transactions/GetTransactionPersonalInteractor'

export default class TransactionPresenter {
  constructor (container) {
    this.getTransactionApprovalInteractor =
      new GetTransactionApprovalInteractor(container.get('HRBenefitsClient'))
      
    this.getTransactionPersonalInteractor =
      new GetTransactionPersonalInteractor(container.get('HRBenefitsClient'))
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
}
