import GetRemarksInteractor from '../../../domain/interactor/remarks/GetRemarksInteractor'
import UpdateRemarksInteractor from '../../../domain/interactor/remarks/UpdateRemarksInteractor'

import GetRemarksParam from '../../../domain/param/GetRemarksParam'
import UpdateRemarksParam from '../../../domain/param/UpdateRemarksParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'


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
          this.view.getRemarks(remarks)
        }, e => {
          this.view.hideLoading()
      })
  }

  updateRemarks (transactionId, approval, remarks) {
    this.updateRemarksInteractor.execute(UpdateRemarksParam(transactionId, approval, remarks))
      .subscribe(resp => {
        let message
        if (approval) {
          message = 'Approve'
        } else {
          message = 'Disapprove'
        }
        this.view.onSuccess()
        store.dispatch(NotifyActions.addNotify({
            title : 'Transactions For Approval',
            message : `Your message is Successfully ${message}`,
            type : 'success',
            duration : 2000
          })
        )
      }, e => {
        this.view.onFailed()
      })
  }

}
