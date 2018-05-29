import GetRemarksInteractor from '../../../domain/interactor/remarks/GetRemarksInteractor'
import UpdateRemarksInteractor from '../../../domain/interactor/remarks/UpdateRemarksInteractor'

import GetTransactionRemarksParam from '../../../domain/param/GetTransactionRemarksParam'

export default class RemarksPresenter {
  constructor (container) {
    this.updateRemarksInteractor =
      new UpdateRemarksInteractor(container.get('HRBenefitsClient'))

    this.getRemarksInteractor =
      new GetRemarksInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getRemarks (benefitId) {
    this.getRemarksInteractor.execute(GetTransactionParam(id))
      .subscribe(transactionResponse => {
          this.view.getTransactionDetails(transactionResponse)
        }, e => {
          this.view.hideLoading()
      })
  }

  updateRemarks () {
    this.UpdateRemarksInteractor.execute()
  }

}
