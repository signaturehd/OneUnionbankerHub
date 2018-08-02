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

  getCompliances () {
    this.getCompliancesInteractor.execute()
      .subscribe(
        data => {
          this.view.showCompliancesData(data)
        }, error => {

    })
  }
}
