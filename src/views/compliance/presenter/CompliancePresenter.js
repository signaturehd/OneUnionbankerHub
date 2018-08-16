import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetCompliancesInteractor from '../../../domain/interactor/compliances/GetCompliancesInteractor'
import SubmitPinInteractor from '../../../domain/interactor/compliances/SubmitPinInteractor'

export default class CompliancePresenter {
  constructor (container) {
    this.getCompliancesInteractor = new GetCompliancesInteractor(container.get('HRBenefitsClient'))
    this.submitPinInteractor = new SubmitPinInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getCompliancesPdf () {
    this.view.circularLoader(true)
    this.getCompliancesInteractor.execute()
      .subscribe(
        data => {
          this.view.setCompliancesPdf(data)
          this.view.circularLoader(false)
        }, error => {
    })
  }

  submitPin (code) {
    this.view.modalLoader(true)
    this.submitPinInteractor.execute(code)
      .subscribe(
        data => {
          this.view.modalLoader(false)
          this.view.noticeResponse(data, true)
        }, error => {
          this.view.modalLoader(false)
    })
  }
}
