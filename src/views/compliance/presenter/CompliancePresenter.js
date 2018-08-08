import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetCompliancesInteractor from '../../../domain/interactor/compliances/GetCompliancesInteractor'

export default class CompliancePresenter {
  constructor (container) {
    this.getCompliancesInteractor = new GetCompliancesInteractor(container.get('HRBenefitsClient'))
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
          console.log(error);
    })
  }
}
