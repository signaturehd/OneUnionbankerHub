import GetRemarksInteractor from '../../../domain/interactor/remarks/GetRemarksInteractor'
import UpdateRemarksInteractor from '../../../domain/interactor/remarks/UpdateRemarksInteractor'

import GetRemarksParam from '../../../domain/param/GetRemarksParam'

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
    this.getRemarksInteractor.execute(GetRemarksParam(benefitId))
      .subscribe(remarks => {
        console.log(remarks)
          this.view.getRemarks(remarks)
        }, e => {
          this.view.hideLoading()
      })
  }

  updateRemarks () {
    this.UpdateRemarksInteractor.execute()
  }

}
