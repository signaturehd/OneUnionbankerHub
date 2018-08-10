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

  getCompliancesPdf (page) {
    this.view.showCircularLoader()
    this.getCompliancesInteractor.execute(page)
      .subscribe(
        data => {
          this.view.setCompliancesPdf(data)
          this.view.hideCircularLoader()
        }, error => {
    })
  }

  submitPin (code) {
    this.view.showCircularLoader()
    this.submitPinInteractor.execute(code)
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponse(data, true)
        }, error => {
        this.view.hideCircularLoader()
    })
  }
}
